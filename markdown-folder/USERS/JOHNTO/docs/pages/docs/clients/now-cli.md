import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InlineCode } from '../../../components/text/code'
import { InternalLink, GenericLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'
import { Table, Row, Column } from '../../../components/table'

export const meta = {
  title: 'Now\'s Command Line Interface',
  description: 'Using Now CLI to create new deployments or control existing ones',
  date: '09 Mar 2017',
  authors: [leo, rauchg],
  editUrl: 'pages/docs/clients/now-cli.md'
}

The `now` CLI is the main interface to the Now platform.

It's available on macOS, Windows, and Linux either via `npm` or as pre-built
binaries. The recommended installation
mechanism, however, is <InternalLink href="/download">Now Desktop</InternalLink> (which
includes Now CLI and also ensures it's always up-to-date).

While the default behavior of `now` is to deploy, it also has a variety of sub
commands grouped by different concerns.

### Cloud Commands

The following are the most important commands in Now CLI:

<Table>
  <Row header>
    <Column left>Syntax</Column>
    <Column right>Description</Column>
  </Row>

  <Row>
    <Column left>
      <InlineCode noWrap>now [path] ...</InlineCode>
    </Column>
    <Column right>
      When you invoke <InlineCode>now</InlineCode>, the files within the current directory will be uploaded to <Now color="#000" /> and a new deployment will be created.<br/><br/>After that, you'll instantly receive its URL so that you can share it with other people around the globe.
      <br/><br/>
      The <InlineCode>[path]</InlineCode> can either be a file (leads to a static deployment) or
      a directory (the deployment type will be determined depending
      on the contents).
      <br/><br/>
      If you want to deploy multiple paths at
      once, <GenericLink href="#deploying-multiple-projects-at-once">read this</GenericLink>.
    </Column>
  </Row>

  <Row>
    <Column left>
      <InlineCode noWrap>now ls|list [app]</InlineCode>
    </Column>
    <Column right>
      Show a list of all deployments. If <InlineCode>[app]</InlineCode> is defined, it will only
      list the deployments under that namespace.
    </Column>
  </Row>

  <Row>
    <Column left>
      <InlineCode noWrap>now rm|remove [id]</InlineCode>
    </Column>
    <Column right>
      Remove a deployment from our platform. The <InlineCode>[id]</InlineCode> parameter can either be the URL of your deployment (e.g. <InlineCode>https://static-ytbbrhoggd.now.sh</InlineCode> or the hostname (e.g. <InlineCode>static-ytbbrhoggd.now.sh</InlineCode>).
    </Column>
  </Row>

  <Row>
    <Column left>
      <InlineCode noWrap>now ln|alias [id] [url]</InlineCode>
    </Column>
    <Column right>
      Let's you configure an alias for an existing deployment. You can read more about how
      to take the maximum of functionality out of this subcommand
      {' '}
      <InternalLink href="/docs/features/aliases">
        here
      </InternalLink>
      .
    </Column>
  </Row>

  <Row>
    <Column left>
      <InlineCode noWrap>now domains [name]</InlineCode>
    </Column>
    <Column right>
      Allows you to manage your domain names directly from the command line (before using
      them as aliases with
      {' '}
      <InlineCode noWrap>now alias</InlineCode>
      ). Read more about it
      {' '}
      <InternalLink href="/docs/features/aliases">
        here
      </InternalLink>
      .
    </Column>
  </Row>

  <Row>
    <Column left><InlineCode noWrap>now certs [cmd]</InlineCode></Column>
    <Column right>
      By default,
      {' '}
      <Now color="#000" />
      {' '}
      will automatically provision certificates for your deployments. Using this subcommand, you can
      see when they're expiring and upload your own ones (
      <InternalLink href="/docs/features/certs">
        read more
      </InternalLink>
      ).
    </Column>
  </Row>

  <Row>
    <Column left>
      <InlineCode noWrap>now secrets [name]</InlineCode>
    </Column>
    <Column right>
      <InternalLink href="/docs/features/env-and-secrets">
        Read more
      </InternalLink>
    </Column>
  </Row>

  <Row>
    <Column left><InlineCode noWrap>now dns [name]</InlineCode></Column>
    <Column right>
      <InternalLink href="/docs/features/dns">
        Read more
      </InternalLink>
    </Column>
  </Row>

  <Row>
    <Column left><InlineCode noWrap>now open</InlineCode></Column>
    <Column right>
      Running this subcommand will open the latest deployment of the project within the current
      directory in your default browser (aliases won't be respected).
    </Column>
  </Row>
</Table>

#### Deploying Multiple Paths at Once

By default, running `now` will
deploy the current working directory. In order to deploy
a different path, pass it to
the command:

<TerminalInput>now [path]</TerminalInput>

In certain cases, however, you might want to deploy multiple
files or directories at once. This works the
same way – just pass more paths to the command:

<TerminalInput>now [path] [path] ...</TerminalInput>

If you pass more than one path, all of them will be uploaded
and bundled into a single static deployment on the server. The
result will be a single URL.

### Administrative Commands

Manage your account straight from your terminal:

<Table>
  <Row header>
    <Column left>Syntax</Column>
    <Column right>Description</Column>
  </Row>

  <Row>
    <Column left><InlineCode noWrap>now billing|cc</InlineCode></Column>
    <Column right>
      Easily add or remove credits cards from your account and adjust billing methods.
    </Column>
  </Row>

  <Row>
    <Column left>
      <InlineCode noWrap>now upgrade|downgrade [plan]</InlineCode>
    </Column>
    <Column right>
      Switch your plan from within the command line interface. Even after the command is run,
      we don't require you to use a web interface. The whole process happens directly in your terminal.
    </Column>
  </Row>
</Table>

To show the list of subcommands and options in your terminal, run this command:

<TerminalInput>now help</TerminalInput>

## Selecting Files and Directories to Be Uploaded

&#8203;<Now color="#000" /> uses the metafiles inside your project to determine which files and directories should be uploaded to our platform and which ones should be ignored:

* If `.gitignore` exists, we don't upload the contents that are defined in it
* If `.npmignore` exists, we don't upload the contents that are defined in it and ignore the existence of .gitignore
* If `.dockerignore` exists, we don't upload the contents that are defined in it and ignore the existence of .gitignore and .npmignore

But it will get a little tricky if you're using the `files` property inside `package.json`: In that case, we follow [npm](https://www.npmjs.com/)'s behavior. This means that if `files` exists (which as [per definition](https://docs.npmjs.com/files/package.json#files) defines which files **should** be uploaded), `.npmignore` will take precedence and have the final word on which items will be uploaded to <Now color="#000" />.

This means that if you want to specify a list of files that should **never be ignored** when it comes to now, you should either use the `now.files` (not `files`) property inside `package.json` or the `files` property inside `now.json`:

```
"files": [
  "hello.png",
  "dist"
]
```

You can learn more about how to use this property <InternalLink href='/docs/features/configuration#"files"-(array)'>here</InternalLink>.

export default withDoc({...meta})(({children}) => <>{children}</>)
