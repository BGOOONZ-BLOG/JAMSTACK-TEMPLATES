import markdown from 'markdown-in-js'
import asset from 'next/asset'
import withDoc from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Image from '../../../components/image'
import {
  TerminalOutput,
  TerminalInput
} from '../../../components/text/terminal'

export const updateMessage = {
  color: 'white',
  background: '#FF0000',
  padding: '1px 3px'
}

export const meta = {
  title: 'Updating Now CLI',
  description: 'Updating Now CLI using Now Desktop or a package manager',
  date: '20 Jan 2018 11:34 AM PDT',
  authors: [ leo ],
  editUrl: 'pages/docs/guides/updating-now-cli.md'
}

If there is a new release
of [Now CLI](https://zeit.co/download#now-cli) available, you will
see a message similar to this one appear in your terminal output:

<TerminalOutput><span style={updateMessage}>UPDATE AVAILABLE</span> The latest version of Now CLI is 8.4.0</TerminalOutput>

This indicates that it is time to update your local instance of
Now CLI. To make this as easy as possible, we have put together this
guide for you.

In order to know which action is the right one for you to take, you
first need to ask yourself these questions:

## Is Now Desktop Installed and Running?

If that is the case, you do not need to do anything – other than
ensuring this option is marked as enabled in [Now Desktop](/download):

<Image
  src={asset(`${IMAGE_ASSETS_URL}/blog/improved-cli-updates/update-option.png`)}
  width={385}
  height={228}
/>

As long as that is the case, you will automatically receive
the latest update for Now CLI once a new release comes out.

## Did You Install Now CLI Manually?

Firstly, you need to determine whether or not the instance
of Now CLI installed on your device is a [canary release](/blog/canary) or
not by running this command:

<TerminalInput>now --version</TerminalInput>

If the output looks similar to this (contains "canary", the exact version
does not need to match), you can safely
assume it is a canary release:

<TerminalOutput>10.0.0-canary.14</TerminalOutput>

Now that you know which release channel you are
using, you can pick the right way to update depending
on where you installed it from:

- [npm](#npm)
- [yarn](#yarn)

---

## npm

For the latest **stable update**, run this command:

<TerminalInput>npm install -g now</TerminalInput>

To get the latest **canary update**, however, run this:

<TerminalInput>npm install -g now@canary</TerminalInput>

## yarn

For the latest **stable update**, run this command:

<TerminalInput>yarn global add now</TerminalInput>

To get the latest **canary update**, however, run this:

<TerminalInput>yarn global add now@canary</TerminalInput>

export default withDoc({...meta})(({children}) => <>{children}</>)
