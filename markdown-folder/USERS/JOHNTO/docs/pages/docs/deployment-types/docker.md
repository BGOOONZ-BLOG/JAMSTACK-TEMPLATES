import withDoc from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { Code } from '../../../components/text/code'

export const meta = {
  title: 'Deploying Docker Apps',
  description: 'Docker apps with Now and all about the deployments',
  date: '09 March 2017',
  authors: [leo],
  editUrl: 'pages/docs/deployment-types/docker.md'
}

If your project contains a `Dockerfile` file, it will always be treated as a [Docker](https://www.docker.com/) deployment.

This means that - when running `now` inside your terminal - your project will be launched into a secure Docker container on our platform, completely isolated from other customers and even your other containers.

In this document, you'll learn the exact specifications and behavior of Docker deployments running on now.

## Built in the Cloud

&#8203;<Now color="#000" />'s Dockerfile support represents a significant departure from traditional virtualization solution offered by mainstream cloud providers. Here's why:

The biggest departure is immediately obvious to the user. The entire deployment consisted of a single command. You spend no time with complicated, slow and proprietary (locked-in) workflows.

The underlying reason this process is so fast and simple is that you spend no time at all worrying about local tooling, images, registries, and caches. As a consequence of that, we're freeing you from the limitations of your local environment and network. The build process belongs in the cloud.

To illustrate this point, pulling, extracting and building the container above took me 3 minutes on a cutting-edge Macbook. Pushing the resulting **200mb** image from an office connection in San Francisco, California to Google® Cloud took another 3 minutes.

In the equivalent amount of time, I would be able to push and build the same image to <Now color="#000"/> **18 times**. The time that's not spent building is spent on iterating on your product and sharing it with the world.

Over the next few months, we'll be rolling out significant enhancements to deepen this vision. While your laptop is constrained by a fixed number of cores, memory, CPU time and bandwidth, the cloud can give you an exponential advantage to you and your business.

## Accelerating Builds

By default, <Now color="#000"/> will build an image of your project by itself. If you want to speed up this process, you can publish a pre-built image on the public [Docker Hub](https://hub.docker.com/). At the moment, we don't support private images. However, it's on our roadmap!

You can select an image by specifying it inside `Dockerfile`:

```
FROM <username>/<image>:<version>
```

Once the container is built, the snapshot will be used when the deployment is scaled or rebooted.

## File System Specifications

There are no limitations inside Docker deployments when it comes to the file system. It's always writable and readable.

## Port Selection

&#8203;<Now color="#000" /> deployment instances always listen on port `443` (HTTPS) of their given URL. Your server code can expose an HTTP service on **any port** of your choice (not multiple ones). <Now color="#000" /> will then route requests received on port `443` to your HTTP service port and its response will then be returned by the deployment instance.

The port that listens for incoming HTTP traffic needs to be defined either in the `Dockerfile` that's being used inside the deployment, or the `Dockerfile` it's "inheriting" from.

Additionally, visitors will be redirected from `http` to `https` automatically.

## Deployment Inactivity

Old deployments always stay around forever if you don't remove them using `now remove`.

However, if your deployment doesn't receive any HTTP(S) requests for a long time, it will most likely be added to the list of deployments that will fall into a light sleep if the platform experiences a lot of load.

There's no definite answer to how long it will take until such a deployment goes to sleep because the time will automatically be calculated based on the platform's load and the number of deployments on it. But if your deployment is linked to an alias, it's less likely to ever fall into a sleep when not being accessed.

All in all, sleeping deployments are here to reduce the effort the system has to push into keeping those running that aren't being accessed at all (which usually means they're inactive and not needed anymore).

Sleeping deployments will wake up in a matter of seconds once a request comes in. The visitor won't experience any errors, because the request will be kept alive until the deployment has woken up.

You can prevent sleep if the number of minimum instances is set to a value larger than zero, as described in [App Lifecycle and Scalability](https://zeit.co/docs/guides/app-lifecycle-and-scalability).

export default withDoc({...meta})(({children}) => <>{children}</>)

