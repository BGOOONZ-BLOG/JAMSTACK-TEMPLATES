import withDoc, { components } from '../../../lib/with-doc'
import Now from '../../../components/now/now'
import { TerminalInput } from '../../../components/text/terminal'
import Caption from '../../../components/text/caption'
import { GenericLink } from '../../../components/text/link'

export const meta = {
  title: 'Static Builds',
  description: 'Using a Dockerfile to build and deploy a static app all from within Now',
  date: '12 July 2018',
  editUrl: 'pages/docs/features/static-builds.md',
  image: IMAGE_ASSETS_URL + '/docs/static-builds/tw-card.png'
}

With <Now color="#000"/>, you can build static apps when deploying using a `Dockerfile`. You can build a static app however you wish and then output the content in a directory called `/public` for Now to upload after the build.

This works incredibly well with our [GitHub integration](/github). You can use this method to build your static apps and then deploy them automatically for review or staging. For example, see this [pull request](https://github.com/zeit/now-static-build-starter/pull/1). For each and every push, you can access the built and deployed static app.

## Quickstart
To build your static apps and deploy them on Now you'll need to create a `Dockerfile` that exports a static app to the `/public` directory. There must also be a `now.json` file with `"type": "static"` for Now to recognize that it should be built and deployed as a static app. Running `now` with this configuration will result in a static app built and deployed on Now.

Now let's take a look at a more in-depth example.

## An example of building and deploying a Static Next.js App to Now
For this example, we are going to use a [simple Next.js app](https://github.com/zeit/now-static-build-starter) that exports as static HTML.

### Step 1: Preparing the app for export
First, let's look at how we would normally export a static app with Next.js in a local environment. We can use the following commands in a terminal, from the app directory, to export static HTML files from your Next.js app.

With Next.js, we can create npm scripts to help build and export our app. In this case, we'll want the following:
```
"scripts": {
  "build": "next build",
  "export": "next export"
}
```
<Caption>Commands for building and exporting a static Next.js app. Read more about <GenericLink href="https://nextjs.org">Next.js static exports</GenericLink>.</Caption>

```
npm run build
npm run export -- -o /public
```
<Caption>With this, Next.js will build a static HTML app inside the `/public` directory, as we defined above in our `package.json`.</Caption>

### Step 2: Creating a `Dockerfile`
For Now to run our build and access our static app files to deploy, we'll need to create a `Dockerfile`. Within this file we can run the build process we defined in the previous step.

Let's look at the `Dockerfile` we would need to build our Next.js app statically.

```
FROM mhart/alpine-node

# Set the default working directory
WORKDIR /usr/src

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn

# Copy the relevant files to the working directory
COPY . .

# Build and export the app
RUN yarn build && yarn export -o /public
```
<Caption>A simple Dockerfile to build a Next.js app with Node.js and the package.json scripts we made in <GenericLink href="#step-1:-preparing-the-app-for-export">Step 1</GenericLink>.</Caption>

If you don't want to copy all of your files to the working directory, [create a whitelist with a `.dockerignore` file](#whitelisting-files-for-deployment-with.dockerignore).

> Note that the `Dockerfile` gives the `export` script an option of `-o /public`. This is necessary because Now will use the contents of the `/public` directory as the content for the static deployment.

### Step 3: Configuring Now for Static deployments
For Now to recognize our deployment as a static app, we'll need to mark it as a `static` type. To do this, we can add the following to the `now.json` configuration.

```
{
   "type": "static"
}
```
<Caption>Setting `type` as `static` in a `now.json` file. Read more about <GenericLink href="/docs/features/configuration">configuring Now</GenericLink>.</Caption>

> Please note that you can extend your `now.json` file as needed, but `"type": "static"` is required for static builds.

Although having a `now.json` is the preferred method for configuring your app deployments, you can also use the following with [Now CLI](/docs/clients/now-cli):
<TerminalInput>now --static </TerminalInput>

### Step 4: Building and Deploying
Finally, we can simply deploy our app by running the following command:

<TerminalInput>now</TerminalInput>

This will send the `Dockerfile` and the rest of our files to Now which will detect the `Dockerfile` and run it to build the app. This is thanks to setting the `type` of the deployment to be `static`. Now will then take the `/public` directory and then deploy it.

Once built and deployed, we can go to the deployment URL that Now gave us and see our static app live!

The above example is deployed to the following URL: [nextjs-static-example.zeit.sh](https://nextjs-static-example.zeit.sh)

_The above deployment is [public](/docs/features/configuration#public(boolean)) so you can append `/_src` or `/_logs` to the URL to see the source of logs!_

You can see the source code of the deployment here: https://github.com/now-examples/nextjs-static

> Make sure you have the latest version of the Now CLI to utilize static builds.<br/> You can get it from [zeit.co/download](https://zeit.co/download).

### Whitelisting files for deployment with `.dockerignore`
Now will recognize a `.dockerignore` file to allow or disallow files to be deployed from your build.

Our recommendation is to create a `.dockerignore` file and utilizing it as a whitelist.

Let's take our first Next.js static app example. We can whitelist our `package.json`, `yarn.lock`, and `pages` directory with the following:

```
*
!pages
!yarn.lock
!package.json
```
<Caption>A `.dockerignore` file whitelisting basic Next.js files and directories.</Caption>

With this file in place, Now will only deploy the files and directories we have listed. This is great to stop any accidentally placed or created files from being uploaded by mistake. We also make the build time shorter by uploading only the necessary files!

## More Examples
With Docker, the possibilities for what we can build as a static app are endless. Let's take a look at a few more examples of what you can do with a `Dockerfile` and a static Now deployment.

Let's have a look at some more examples:

### Jekyll
Here is an example of a simple Jekyll-based static app which uses a custom plugin. Unlike GitHub pages, where you cannot deploy since the plugin is not whitelisted, the Dockerfile we'll use compiles the Jekyll app at build time so we can use the plugin easily.

However, you can deploy this app inside Now without any issues. Here's the Dockerfile which builds the Jekyll app inside Now:

```
FROM ruby:2.5-alpine

# Set the default working directory
WORKDIR /usr/src

# Install some useful packages
RUN apk --no-cache add \  
  zlib-dev \  
  build-base \  
  libxml2-dev \  
  libxslt-dev \  
  readline-dev \  
  libffi-dev \  
  yaml-dev \  
  zlib-dev \  
  libffi-dev \  
  cmake

# Copy local files
COPY . .

# Build and export the app
RUN bundle install && \  
  bundle exec jekyll build --destination /public
```
<Caption>A `Dockerfile` that utilizes Ruby and other packages to build a static Jekyll app and export it to `/public`</Caption>

Take a look at the live example: https://zeit.co/zeit/now-jekyll/slxipttlce

View the source code for the complete example: https://github.com/now-examples/jekyll-static

### create-react-app
[create-react-app](https://github.com/facebook/create-react-app) is a very popular React application project generator.

Let's take a look at using `create-react-app` with Docker and Node.js 10:

```
FROM mhart/alpine-node:10
WORKDIR /usr/src
COPY yarn.lock package.json ./
RUN yarn
COPY . .
RUN yarn build && mv build /public
```
<Caption>An example `Dockerfile` for building a `create-react-app` project to the `/public` directory</Caption>

If you are using routing in your SPA don't forget to add a rewriting rule to point to your `index.html`. This can be done by editing `now.json` and adding the following block

```
"static": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
```
<Caption>An example of a rewrite rule to support SPA routing</Caption>

### Your own Continuous Integration
Static builds don't just mean that you have to export your app statically, it also presents a fantastic opportunity to run scripts that test your app too.

Even if you're using GitHub and have nothing to deploy in your repository, you can use Now + GitHub and a `Dockerfile` to run your own tests for each pull request.

Let's take a look at an example pull request using this method: https://github.com/importpw/querystring/pull/1.

When someone pushes to that PR, Now will run tests inside that app and hosts the test report as a static app.

Here's the `Dockerfile` used inside that repo for the tests and deploying the report:

```
FROM alpine:3.5
RUN apk add --no-cache curl bash
WORKDIR /public
COPY . .
RUN bash ./test.sh
RUN echo "All tests passed!" > index.txt
```
<Caption>A simple `Dockerfile` that runs a custom test script and prints the results to a text file ready to be deployed.</Caption>



export default withDoc({...meta})(({children}) => <>{children}</>)
