import withDoc from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'Managing SSL Certificates',
  description: 'SSL Certificates for your Now deployments and how you can easily manage them',
  date: '15 Mar 2017',
  authors: [leo],
  editUrl: 'pages/docs/features/certs.md'
}

Each time you create a new deployment, you will get a new unique subdomain. For this address (just like for the custom domains you've added using `now alias` or `now alias`), we're automatically provisioning an SSL certificate for you.

Our platform seamlessly communicates with [Let's Encrypt](https://letsencrypt.org/) to provide your deployment's domain with an [X.509](https://en.wikipedia.org/wiki/X.509) certificate without any costs. All of this happens in the background, seamlessly.

You can read more about how exactly the certificate provisioning works [here](https://letsencrypt.org/how-it-works/). If you're interested in knowing which browsers the certificates are compatible with, [this](https://letsencrypt.org/docs/certificate-compatibility/) might also be of interest to you. At last, [this document](https://letsencrypt.org/certificates/) describes how the certificates work per se.

## Using the CLI

Let's take a look at how you can use <Now color="#000" />'s command line interface to manage your existing certificates and even upload new ones. In the following examples, `zeit.rocks` represents the domain you'd like to modify.

### now certs ls

Lists all certificates owned and created by the user. All certificate entries ever created will remain there in the list, as long as the user still owns the domain associated with the certificate. The actual certificates may, however, change over time. For example, we periodically renew all the certificates created with the API.

### now certs create zeit.rocks

Allows you to create a new certificate for any domain you have access to and have registered with now. There shouldn't be much real use for this command and it's mainly provided for symmetry, though you may want to use it for creating a certificate entry for a subdomain in advance, before creating an alias using the domain.

### now certs replace

The command can be used to upload a certificate issued by a 3rd party Certificate Authority. It requires you to already have an alias with an automatic certificate in place. You can use it like this:

<TerminalInput>
  <b>now certs replace</b> --crt domain.crt --key domain.key --ca ca_chain.crt zeit.rocks
</TerminalInput>

**Keep in mind**: `--ca ca_chain.crt` is optional but needed if your certificate provider is not considered as a root Certificate Authority by web browsers and operating systems (which is usually the case). This file is usually provided by the Certificate Authority you're using.

## Renewal failure

When automatic certificate renewal fails, we will send you a notification email. Here are some possible reasons:

1. The domain is no longer used in Now
2. A CAA record permitting issuing a certificate is missing or is invalid
3. Other DNS records are missing or invalid
4. HTTP requests are being redirected to HTTPS (for example <InternalLink href="/docs/guides/how-to-use-cloudflare#cloudflare-as-a-proxy-server">when using Cloudflare</InternalLink>)

## The API Endpoint

As of version **0.6.0**, [now-client](https://github.com/zeit/now-client) comes with API wrappers for managing the certificates bound to aliases using a custom domain.

Normally, when a user created an alias with <Now color="#000" /> command line utility, we automatically issued a certificate for it (as previously described in ${<InternalLink href="/blog/now-alias">this post</InternalLink>}). So technically, the API endpoint was already there. But until recently, it only supported issuing new certificates. By now, it also supports renewal, removal, and replacement.

The endpoint is called `/now/certs` and available in our <InternalLink href="/api#endpoints">REST API</InternalLink>.

export default withDoc({...meta})(({children}) => <>{children}</>)
