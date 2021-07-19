import withDoc from '../../../lib/with-doc'

import Caption from '../../../components/text/caption'
import { GenericLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'Build-Time Environment Variables and Secrets',
  description: 'Creating and using environment variables and creating and using secret environment variables during the build stage of Now deployments',
  date: '19 July 2018',
  editUrl: 'pages/docs/features/build-env-and-secrets.md',
  image: IMAGE_ASSETS_URL + '/docs/build-env/twitter-card-2.png'
}

> If you are looking for information covering environment variables and secrets to use within your app, read our guide on [Run-Time Env and Secrets](/docs/features/env-and-secrets)

There are multiple stages involved in the process of deploying an app, for example installing dependencies. For Now to recognize that an app needs a build step, that app will need a `Dockerfile`, which will contain all of the build steps for the app.

Using a `Dockerfile` is to define the process of an app being built on Now, which will deploy the app after the build process using the `Dockerfile` configuration.

During the build process, information that needs to be used at that time might not be safe to hard code into the app or preferred to be kept in a configuration file for the app. In this case, Now supports a method that allows assigning an environment variable or secret for deployments to use during build time.

## Step 1: Setting up Build Environment Variables and Secrets
To use custom environment variables or secrets in the build process on Now, there are two methods.

### The `now.json` method
Provide a Now deployment with environment variables directly from within the `now.json` configuration file. To do so for the build step, the environment variables must be within the `build.env` property. For example:

```
{
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```
<Caption>Listing the `NODE_ENV` build environment variable with the value of `production` within a `now.json` configuration file and within the `build.env` property.</Caption>

### The Now CLI Method
Using the built-in `--build-env` parameter to pass environment variables to the build stage of a Now deployment. For example, the following command will give the `NODE_ENV` environment variable the value of `production`:

<TerminalInput>now --build-env NODE_ENV=production</TerminalInput>
<Caption>Setting the `NODE_ENV` build environment variables to have a value of `production` with Now CLI</Caption>

### Using Secrets
Secrets are a way to keep information from being displayed in configuration or in code. [Now will store secrets associated with an account or team](/docs/features/env-and-secrets#securing-env-variables-using-secrets) ready for use with environment variables.

To use secrets with Now in the build stage, the first step is to add a secret with the `now secret` command in Now CLI.

<TerminalInput>now secret add npm-token {`<NPM_TOKEN_VALUE>`}</TerminalInput>
<Caption>Adding the `npm-token` secret to an account or team, with the example of a value</Caption>

The second step to using a secret at build-time is to pass it as an environment variable, using both methods above but by using an `@` symbol before the value.

For example, in a `now.json` configuration, it will look like this:

```
{
  "build": {
    "env": {
      "NPM_TOKEN": "@npm-token"
    }
  }
}
```
<Caption>Using the `npm-token` secret with an environment variable within a `now.json` configuration.</Caption>

It is also possible to use secrets with Now CLI using the same method of using the `@` symbol before the value

Read more about [secrets within Now](/docs/features/env-and-secrets#securing-env-variables-using-secrets) for more examples and information.

## Step 2: Using Build Environment Variables and Secrets
With environment variables set up using one of the methods above, with secrets or not, use them within the build step using a `Dockerfile`.

Having a `Dockerfile` gives Now the context that a build step exists for an app. Within that `Dockerfile`, use environment variables set up in previous steps (including those with values associated with secrets) using the [`ARG` instruction](https://docs.docker.com/engine/reference/builder/#arg).

For example, to use the `NPM_TOKEN` environment variable from the [last step](#using-secrets) use the following in a `Dockerfile`:
```
ARG NPM_TOKEN
```
<Caption>Creating an ARG variable with the value of an earlier created environment variable</Caption>

The `Dockerfile` and Now will associate the value of that `ARG` with the `NPM_TOKEN` environment variable. Then, subsequently use this value by referencing the `ARG` with the same name with a `$` prefixing it.

```
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
```
<Caption>Using an environment variable and `ARG` in conjunction to output a valid `.npmrc` for private npm</Caption>

> Note that by default an app with a `Dockerfile` deployment will be detected as a Docker deployment. Make sure to mark an app as [`"type": "static"` within the now.json configuration](docs/features/static-builds#step-3:-configuring-now-for-static-deployments) if the app should be deployed and built as static using the `Dockerfile`.

## Example of using environment variables to install private npm packages
To use private npm packages, npm requires that apps provide an auth token. It is not always possible or safe to hardcode this auth token, so environment variables and secrets are the features available to manage this.

To start, a new token is needed. npm will create a new token using the command `npm token create --read-only`. It is better to keep this token secret to avoid others gaining access to private packages. To protect the token from reaching others outside of those intended, the `now secret` command will take the token and associate it with an account or team ready to be used with environment variables.

<TerminalInput>now secret add npm-token {`<NPM_TOKEN_VALUE>`}</TerminalInput>
<Caption>Adding the `npm-token` secret to an account or team.</Caption>

Once the secret is added, it can be used in a `now.json` configuration using environment variables.
```
{
  "build": {
    "env": {
      "NPM_TOKEN": "@npm-token"
    }
  }
}
```
<Caption>This is also possible with the <GenericLink href="#the-now-cli-method">Now CLI method</GenericLink>.</Caption>

> The `now.json` configuration can be extended beyond just a `build.env` property. [Read more about configuring deployments](/docs/features/configuration).

With the environment variable `NPM_TOKEN` set to the value of the `npm-token` secret, which contains an npm auth token, it is ready to use.

This example describes how to install dependencies for a [static app build](/docs/features/static-builds). The `Dockerfile` holds an [`ARG` instruction](https://docs.docker.com/engine/reference/builder/#arg) that relates to the recently created `NPM_TOKEN` environment variable.

```
FROM mhart/alpine-node

# Retrieve and relate to the `NPM_TOKEN` environment variable
ARG NPM_TOKEN

# Print into `.npmrc` with a string using the `NPM_TOKEN` ARG
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

WORKDIR /usr/src

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn
COPY . .

# Run build and export
RUN yarn build &&
  yarn export -o /public
```
<Caption>Note that the usage of the `ARG` instruction starts with a `$`. This is necessary for Docker to recognize this as an <GenericLink href="https://docs.docker.com/engine/reference/builder/#arg">ARG instruction reference</GenericLink>.</Caption>

With the `Dockerfile` complete, the project is ready to be deployed on Now:

<TerminalInput>now</TerminalInput>

Through the deployment lifecycle, the build stage will execute with the configuration defined in the `Dockerfile` including that of the environment variables and secrets.

An example repository is available to give a more in-depth look at a project that uses build-time environment variables and secrets.

export default withDoc({...meta})(({children}) => <>{children}</>)
