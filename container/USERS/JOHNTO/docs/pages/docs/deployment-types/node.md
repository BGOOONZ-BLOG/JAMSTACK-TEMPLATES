import withDoc from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'Deploying Node.js Apps',
  description: 'What counts as a Node.js App for Now deployments and more information about them',
  date: '09 March 2017',
  authors: [leo],
  editUrl: 'pages/docs/deployment-types/node.md'
}

If your project contains a `package.json` (and no `Dockerfile`) file, it will always be treated as a [Node.js](https://nodejs.org/en/) deployment.

This means that when you run `now`, your code will be launched into a 64-bit Node.js environment running on Alpine Linux (using [musl](https://www.musl-libc.org/) instead of [glibc](https://www.gnu.org/software/libc/) for the core libraries).

In this document, you'll learn the exact specifications and behavior of Node.js deployments running on now.

## File System Specifications

By default, it's not possible to write files to the file system when creating Node.js deployments.

But there's an exception: The first time the build step (either using the `build` or `now-build`) runs, Node.js will be able to write to the file system. This is necessary for allowing applications to be bundled and/or transpiled on the server.

After either the `start` or `now-start` scripts have started running, the only writable location will be `/tmp`.

Inside this directory, temporary data can be saved. But please note that it will be **removed each time each deployment goes to sleep** and wakes up again. In turn, it is **not** safe to be used as a file-based database.

## Package Installation

After <Now color="#000" /> has taken care of setting up the base of your deployment, the first real interaction with your code will be installing the dependencies you've defined inside `package.json`.

For this process, we're using our so-called "ace" technology behind the curtains.

It not only comes with a global shared cache of public modules to avoid repetitive work in each deployment, but it also caches the artifacts of binary packages which requires packages like `node-canvas` to only get compiled once. Afterward, our build servers securely share it with all of our customers (which saves a lot of time).

You can read more about it <InternalLink href="/blog/faster-javascript-deployments">here</InternalLink>.

## Ignoring devDependencies

If you only want to install `dependencies`, not `devDependencies`, you can set the environment variable `NODE_ENV` to "production" by either using the `-e` option of the CLI like this:

<TerminalInput>now -e NODE_ENV="production"</TerminalInput>

or using the <InternalLink href="/docs/features/configuration#`env`-(object)">env</InternalLink> configuration property:

```
"env": {
  "NODE_ENV": "production"
}
```

In cases where you need to set the `NODE_ENV` variable to "production", but still need to have the `devDependencies` installed, then you can use the environment variable on the `build` script property as shown below:

```
"scripts": {
  "build": "NODE_ENV=production next build"
}
```

## Port Selection

&#8203;<Now color="#000" /> deployment instances always listen on port `443` (HTTPS) of their given URL. Your server code can expose an HTTP service on **any port** of your choice (not multiple ones). <Now color="#000" /> will then route requests received on port `443` to your HTTP service port, and its response will be returned by the deployment instance.

Additionally, visitors will be redirected from `http` to `https` automatically.

## Custom Node.js Configuration

Other than selecting the version of Node.js using the engines property,

```
"engines": {
  "node": "7.4.0"
}
```

there are no other ways to interfere with the image of your deployment. This means that if you want to use a custom runtime, a special version of Linux or some other form of low-level customization, you should consider a <InternalLink href="/docs/deployment-types/docker">Docker deployment</InternalLink>.

It will allow you to specify all of these things inside a `Dockerfile`. This results in much wider customization options.

## Deployment Inactivity

Old deployments always stay around forever if you don't remove them using `now remove`.

However, if your deployment doesn't receive any HTTP(S) requests for a long time, it will most likely be added to the list of deployments that will fall into a light sleep if the platform experiences a lot of load.

There's no definite answer to how long it will take until such a deployment goes to sleep because the time will automatically be calculated based on the platform's load and the number of deployments on it. But if your deployment is linked to an alias, it's less likely to ever fall into a sleep when not being accessed.

All in all, sleeping deployments are here to reduce the effort the system has to push into keeping those running that aren't being accessed at all (which usually means they're inactive and not needed anymore).

Sleeping deployments will wake up in a matter of seconds once a request comes in. The visitor won't experience any errors, because the request will be kept alive until the deployment has woken up.

You can prevent a deployment from sleeping by scaling the minimum number of available instances to one or more, [as described in the scaling docs](/docs/getting-started/scaling).

export default withDoc({...meta})(({children}) => <>{children}</>)
