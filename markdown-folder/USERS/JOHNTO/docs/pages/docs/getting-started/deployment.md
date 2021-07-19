import asset from 'next/asset'
import withDoc from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import Caption from '../../../components/text/caption'
import Image from '../../../components/image'
import { InternalLink } from '../../../components/text/link'
import Now from '../../../components/now/now'

export const meta = {
  title: 'Deployment',
  description: 'How to setup and deploy Node.js apps, Docker apps, or static websites with Now',
  date: '1 August 2017',
  authors: [arunoda],
  editUrl: 'pages/docs/getting-started/deployment.md'
}

With <Now color="#000"/>, you can deploy any kind of web app by using a single command. <Now color="#000"/> supports three types of deployments:

* <InternalLink href="#static-deployment">Static</InternalLink> - for static web apps
* <InternalLink href="#node.js-deployment">Node.js</InternalLink> - for Node.js apps
* <InternalLink href="#docker-deployment">Docker</InternalLink> - for all other apps

We have special categories for static and Node.js deployments because they are the most common among the deployments we handle. But you can also use Docker to deploy static and Node.js apps.

Here is how each of these deployments work:

## Static Deployment

With static deployment, you can deploy a static web app or a set of assets to <Now color="#000"/>. Visit the directory you want to deploy and run this command:

<TerminalInput>now</TerminalInput>

If that directory contains an `index.html` file, that file will be served. Otherwise, <Now color="#000"/> will show all the files in that directory.

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/deployment/static-dir-listing.png`)}
  width={600}
  height={325}
  caption="Directory listing of a static deployment"
/>

> For all static deployments, you will be charged only for the bandwidth. You [do not pay](https://zeit.co/blog/unlimited-static) for computing resources and storage.

To learn more about static deployments, read <InternalLink href="/docs/deployment-types/static">this guide</InternalLink>.

## Node.js Deployment

If you have a `package.json` file in your app directory, <Now color="#000"/> considers that a valid Node.js deployment. Here is a simple Node.js deployment with the help of [micro](https://github.com/zeit/micro).

We have two files in our app directory. They are:

### index.js
```
module.exports = () => ({
  date: new Date
})
```

### package.json
```
{
  "name": "get-started-node",
  "version": "0.1.0",
  "dependencies": {
    "micro": "latest"
  },
  "scripts": {
    "start": "micro"
  }
}
```

To deploy this app, visit the app directory and run this command:

<TerminalInput>now</TerminalInput>

&#8203;<Now color="#000"/> will install dependencies and run the `start` NPM script, as mentioned in the above `package.json` file.

You can also specify a separate build command, select the Node.js runtime and control dependency installation, and do more. To learn about those, read <InternalLink href="/docs/deployment-types/node">this guide</InternalLink>.

## Docker Deployment

If your app directory contains a `Dockerfile`, <Now color="#000"/> considers that a valid [Docker](https://www.docker.com/) deployment. It will build a docker image based on the `Dockerfile` and start container(s) based on that.

To deploy a simple [Go](https://golang.org/) HTTP server, create a directory and add these two files:

### main.go
```
package main

import (
  "fmt"
  "net/http"
)

func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello from Go")
  })
  http.ListenAndServe(":3000", nil)
}
```
<Caption>A simple Go file that prints "Hello from Go".</Caption>

### Dockerfile
```
FROM golang:1.9-alpine as base
WORKDIR /usr/src
COPY . .
RUN CGO_ENABLED=0 go build -ldflags "-s -w" -o main

FROM scratch
COPY --from=base /usr/src/main /go-http-microservice
CMD ["/go-http-microservice"]
```
<Caption>A multi-stage build Dockerfile that enables the use of Go and runs our `main.go` file.</Caption>

> Note: Without enabling Now Cloud v2 with the following `now.json` configuration, the Dockerfile will require an `EXPOSE` instruction. In this case it would be `EXPOSE 3000`.

### now.json
```
{
  "features": {
    "cloud": "v2"
  }
}
```
<Caption>Enabling Now Cloud v2 from a `now.json` configuration file.</Caption>

### .dockerignore
Create a whitelist for the files you want to use.

```
*
!main.go
```
<Caption>A `.dockerignore` file that allows the `main.go` file to be in the Docker build context.</Caption>

Now run this command inside that directory:

<TerminalInput>now</TerminalInput>

That's it. You'll get a URL like this: <https://go-hello-isftssqinn.now.sh>

To learn more about Docker deployments on <Now color="#000"/>, read <InternalLink href="/docs/deployment-types/docker">this guide</InternalLink>.

export default withDoc({...meta})(({children}) => <div>{children}</div>)
