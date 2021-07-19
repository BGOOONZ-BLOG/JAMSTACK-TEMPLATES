import withDoc from '../../../lib/with-doc'
import asset from 'next/asset'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import Image from '../../../components/image'
import {
  TerminalInput,
  TerminalOutput
} from '../../../components/text/terminal'

export const meta = {
  title: 'Building a Static Website',
  description: 'Creating and deploying a static website with Now',
  date: '23 Feb 2017',
  authors: [leo],
  editUrl: 'pages/docs/examples/static.md'
}

With just a single command, even complex Node applications or Docker containers can be deployed with Now.

But in some cases, there isn't the need for running code on the server. Sometimes you just want to share files or make a static website accessible for other people.

Thankfully, our tools make deploying such a project just as easy as it is with a full-blown application.

## Setup

Because basic static websites do not require any special tools in order to work, there is not much you need to do in order to prepare your own. For the beginning, just create a directory and switch to it by running the following your terminal:

<TerminalInput>mkdir static-site && cd static-site</TerminalInput>

Inside that directory, use your favorite editor to create an `index.html` file with this content:

```
<img src={'http://assets.zeit.co/image/upload/v1503122848/front/logos/black-bg-logo.svg'}>

<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #000;
    margin: 0;
  }

  img {
    max-height: 100vh;
    max-width: 300px;
  }
</style>
```

The code basically loads ZEIT's logo from our content delivery network and shows it to the user. In addition, I sprinkled some cute CSS styles on top to position the image in the exact center of the page.

This is how it will look in the browser when opening the file:

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/static/browser.png`)}
  width="550"
  height="319"
/>

## Testing Your Project

When developing a static project, you should always make sure that it works on various devices, not just on your own. This can be solved by simply skipping to <InternalLink href="/docs/examples/static#deploying-the-site">Deploying</InternalLink>, sending the link to somewhere else and then testing it from there.

This is a very good idea when working with people across the whole globe and having them try out your project for you. But if you only want to open it on your personal device, there is a specialized solution: [serve](https://github.com/zeit/serve).

Want to see what it does exactly? Easy! Simply start by installing it:

<TerminalInput>npm install -g serve</TerminalInput>

Afterward, move into the directory containing your static site:

<TerminalInput>cd static-site</TerminalInput>

And then, finally, run it using this command:

<TerminalInput>serve</TerminalInput>

Now you will see a message like this one:

<TerminalOutput><b style={{fontWeight: 'normal', color: '#fd7cfc'}}>INFO:</b> Accepting connections at http://localhost:3000</TerminalOutput>

It is that easy! Now you can click the link to open your project in the browser.

You can stop `serve` by hitting `CTRL + C`.

## Deploying the Site

Once the static website works on all devices, we can deploy it by running this command:

<TerminalInput>now</TerminalInput>

Once <Now color="#000" /> has finished uploading the files, you'll see a URL that points to your freshly created website. This means that you can already share the URL with other people across the globe and have them enjoy your site.

But in the case of a real website (not used for testing purposes), you would now have to <InternalLink href="/docs/features/aliases">assign an alias</InternalLink> to it.

export default withDoc({...meta})(({children}) => <>{children}</>)
