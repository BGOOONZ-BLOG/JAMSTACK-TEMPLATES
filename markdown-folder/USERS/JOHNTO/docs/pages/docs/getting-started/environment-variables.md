import withDoc from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { InternalLink } from '../../../components/text/link'
import Now from '../../../components/now/now'

export const meta = {
  title: 'Environment Variables',
  description: 'Setting up environment variables to use in your deployed Now apps',
  date: '6 August 2017',
  authors: [arunoda],
  editUrl: 'pages/docs/getting-started/environment-variables.md'
}

Almost every app needs to get configurations at runtime. These configurations could be anything, including:

* Database connection details
* Third-party API keys
* Different customization parameters

The best way to expose these configurations is to do so with [environment variables](https://en.wikipedia.org/wiki/Environment_variable), which is a universally available method that works across various programming languages, operating systems and hosting providers.

Exposing environment variables with <Now color="#000"/> is easy.

## Via CLI

You can expose environment variables with the `-e` flag.

<TerminalInput>now -e MONGO_URL="user:password@mydb.com" -e MY_API_TOKEN="XXXXX"</TerminalInput>

You can then access them inside your app.<br/>
If your app is a Node.js app, here's how you can do that:

```
const { MONGO_URL, MY_API_TOKEN } = process.env
```

## Via “now.json”

You can also expose these environment variables with [now.json](https://zeit.co/docs/features/configuration). For that, create a file named `now.json` inside your app root and add environment variables like this:
```
{
  "env": {
    "MONGO_URL": "user:password@mydb.com",
    "MY_API_TOKEN": "XXXXX"
  }
}
```

After that, `now` will use above environment variables when you deploy your app.

> It's not a good idea to commit the `now.json` file to [Git](https://en.wikipedia.org/wiki/Git) if it contains secret information. For that, consider using <InternalLink href="/docs/getting-started/secrets"><Now color="#067df7"/> Secrets</InternalLink>.

export default withDoc({...meta})(({children}) => <>{children}</>)
