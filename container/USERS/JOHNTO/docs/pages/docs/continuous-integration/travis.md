import asset from 'next/asset'
import withDoc from '../../../lib/with-doc'

import { devisscher, sergio } from '../../../lib/data/team'
import { Code, InlineCode } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'
import Caption from '../../../components/text/caption'

export const meta = {
  title: 'Continuous Integration with Travis CI',
  description: 'Deploy your changes in your GitHub repositories after every push using Travis CI and Now',
  date: '13 Mar 2018',
  authors: [devisscher, sergio],
  editUrl: 'pages/docs/continuous-integration/travis.md',
  image: IMAGE_ASSETS_URL + '/docs/ogp/travis-ci-guide.png'
}

Travis Ci is a Continuous Integration tool that lets you automate the build and deployment of your project when something new is pushed to a GitHub repository.

In this guide, we will set up our Travis CI pipeline to:
- Create a new deployment after each push to any branch
- [Alias](/docs/features/aliases) your deployment made on the master branch with your [custom domain](/docs/getting-started/assign-a-domain-name)
- Optionally; build an application inside Travis instead of with Now

## Step 1: Getting a Now Token

The first thing you'll need is a token for your account. You can get this in the [Tokens section](/account/tokens) of your Account Settings.

Head to the tokens page of your dashboard by navigating to your Account Settings and then clicking the "Tokens" link.

By entering a name into the input labeled "Create a new token..." and subsequently pressing <kbd>Enter</kbd>, a new token will be created which you can copy to your clipboard by clicking `Copy`.

With this token you can use Now with your account anywhere with the following command:

<TerminalInput>now --token [TOKEN]</TerminalInput>

<Caption>Replace <InlineCode>--token</InlineCode> with <InlineCode>-t</InlineCode> for short.</Caption>

The `[TOKEN]` in the example command is replaced with the token you copied from your Account Settings.

## Step 2: Preparing your project to use Travis

First of all, make sure you've signed up with Travis and synced the repositories you'd like to use with Now previous to this. If you have yet to do this, read steps 1 and 2 of the Travis CI's ["To get started with Travis CI" guide](https://docs.travis-ci.com/user/getting-started). If you're configuring a public repository, you can use [travis-ci.org](https://travis-ci.org), otherwise, if the repository is private, you'll need to use the paid version on [travis-ci.com](https://travis-ci.com).

Now that you have your token and have set up your GitHub account with Travis, you can start integrating Travis into your project. Start by creating a `.travis.yml` file in the root of your repository.

Next, go to the desired repository's settings in Travis (e.g. `https://travis-ci.org/:username/:repository/settings`) and add a new environment variable with the value of your newly created Now token. If you call it `NOW_TOKEN` you can then use it inside Travis CI configuration like the following for example:

<TerminalInput>now --token $NOW_TOKEN</TerminalInput>

> *Note*: You can use any name for your environment variable, just change the name that you entered into the repositories settings in Travis CI with your own variable name and then use that name with `$` at the beginning like the example above.

## Step 3: Configuring Travis to deploy with Now using your Token

Now that Travis is integrated into your repository, you need to configure your Travis pipeline. In order to do that you need to change your `.travis.yml` file and add the following content:

```
language: node_js
node_js:
  - "node"
cache:
  directories:
    - "node_modules" # This will tell Travis CI to cache the dependencies
script: npm test # Here you could also run the build step of your application
before_deploy: npm install now --no-save # Install Now CLI on Travis
deploy:
  - provider: script # Run a custom deployment script which we will define below
    script: now --token $NOW_TOKEN
    skip_cleanup: true
    on:
      all_branches: true
      master: false
  - provider: script
    script: now --token $NOW_TOKEN && now alias --token $NOW_TOKEN
    skip_cleanup: true
    on:
      master: true
```

> *Note*: If you are deploying using an OSS account you will have to add the `--public` argument with the Now commands to avoid being asked if you are sure you want your deployment to be public, which will block the build; awaiting user input.

As you may have noticed, the above script for the master branch uses the `now alias` command without providing the deployment URL and the alias to use. This can be achieved [using a configuration file](/docs/features/configuration). You can read more about it in ["How Do I Deploy and Alias in a Single Command?"](/docs/other/faq#how-do-i-deploy-and-alias-in-a-single-command) on our FAQ page.

And that's it! Every time you push something new to any branch it will create a new deployment and if the branch is master it will also move the project aliases to it.

## Optional: Avoid building on Now (Instead build on Travis)

In some cases, you may prefer to build on Travis CI instead of directly on Now. If that's the case, this can be achieved by modifying your `.travis.yml` and `now.json` files a little bit.

### Defining what to deploy

If you decide to build your application on Travis CI you will not need to deploy your source code, if that's the case you can use a [configuration file with the `files` key](/docs/features/configuration#files-(array)) to specify what to deploy.

If you are building a [Next.js](https://github.com/zeit/next.js) application with a [custom server](https://github.com/zeit/next.js#custom-server-and-routing) you can add the following to your configuration file.

```
{
  "files": [
    ".next",
    "server",
    "static",
    "package.json",
    "yarn.lock"
  ]
}
```

With this, Now will only deploy the files under the directories `.next`, `server`, `static`, and the files `package.json` and `yarn.lock`. You can customize this to add any files which will be required by your application after the build step.

### Building on Travis

To run your build on Travis CI you only need to change your `.travis.yml` file to run the build script. To do this, change the `script` part of your file as follows:

```
script: npm run build
```

> *Note*: This will make Travis CI run the build script instead of the test script, you can add a prebuild or postbuild step to run tests

Since you are building your application on Travis, you don't want Now to try to build it. To avoid this you can add the following simple script to your `package.json`.

```
{
  "scripts": {
    "now-build": "echo 'Built on Travis CI'"
  }
}
```

If the `now-build` script is defined, Now will use it instead of `build`. This lets you define it yourself in order to customize the build step on Now or just avoid building it on Now entirely.

export default withDoc({...meta})(({children}) => <>{children}</>)
