import withDoc from '../../../lib/with-doc'

import { leo, jamo, rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'Deploying Static Apps',
  description: 'All about Static App deployments on Now',
  date: '09 March 2017',
  authors: [leo, jamo, rauchg],
  editUrl: 'pages/docs/deployment-types/static.md'
}

&#8203;<Now color="#000"/> comes with built-in support for static deployments. It considers all projects that don't have a `Dockerfile`, nor a `package.json`, a static deployment.

Deploying such a static project is still as easy as running a single command:

<TerminalInput>now</TerminalInput>

## Under the Hood

Static deployments running on <Now color="#000"/> are powered by [serve-handler](https://github.com/zeit/serve-handler), which you can download, fork, extend, and
even operate locally during development by
importing the module itself into an [existing server](https://github.com/zeit/serve#api) or
using its [command line interface](https://github.com/zeit/serve).

What does this mean for your team and your business?

Great user experience with zero lock-in.

## Customization

In order to change the default behaviour of your static deployment running on <Now color="#000"/>, you only need to
create a `now.json` file with a `static` property that
holds any of [these values](https://github.com/zeit/serve-handler#options).

Here is an example for forcing [trailing slashes](https://github.com/zeit/serve-handler#trailingslash-boolean):
```
{
  "static": {
    "trailingSlash": true
  }
}
```

Then, once you run `now`, we will automatically upload this configuration to <Now color="#000"/> and
adjust the behavior of the deployment accordingly.

Furthermore, when developing locally, [serve](https://github.com/zeit/serve) can be used. If so, the same
configuration file will be read and [serve](https://github.com/zeit/serve) will adapt itself.

## Default Behavior

If you do not overwrite the following configuration properties using a `now.json`file, they
will be enabled by default for <Now color="#000"/>:

- `renderSingle` set to `true`
- `cleanUrls` set to `true`
- `headers` contains an `ETag` header for every file
- `directoryListing` set to `true`

You can read more about these properties [here](https://github.com/zeit/serve-handler#options).

In order to receive the contents of directories, errors, and other meta information
as JSON instead of HTML, you can set the following header on your request:

```
Accept: application/json
```

### Deployment Inactivity

Deployments stay around forever if you do not remove them using `now remove`, like shown
on [this page](/docs/clients/now-cli#cloud-commands).

Static deployments are **never** put to sleep and are always **quickly accessible**.

export default withDoc({...meta})(({children}) => <>{children}</>)
