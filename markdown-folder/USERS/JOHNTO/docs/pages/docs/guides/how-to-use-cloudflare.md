import asset from 'next/asset'
import withDoc from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'How to Use Cloudflare with Now',
  description: 'Using Cloudflare as a DNS Server or Proxy Server with Now',
  date: '11 Jan 2018 11:34 AM PDT',
  authors: [arunoda],
  editUrl: 'pages/docs/guides/how-to-use-cloudflare.md'
}

In this guide, we are looking at how we can use [Cloudflare](https://www.cloudflare.com/) with <Now color="#000"/>.

## Cloudflare as a DNS Server

Here we'll be using Cloudflare as a pure DNS service. We setup a few DNS records, which allow your domain to work with <Now color="#000"/>.

> These steps are valid for any external DNS service, not just Cloudflare.

### 1. Setting Up

First of all, add our domain (`my-app.work`) to <Now color="#000"/> with:

<TerminalInput>now domain add --external my-app.work</TerminalInput>

Then, <Now color="#000"/> will ask you to create a TXT record in the domain's DNS provider.

Here's how the Cloudflare's DNS settings page looks after we've added the TXT record.

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/how-to-use-cloudflare/cloudflare-now-txt.png`)}
  width={600}
  height={336}
/>

> This TXT record verifies the ownership of your domain name, So <Now color="#000"/> can create SSL certificates automatically, as needed.

### 2. Add CNAME Record

<Now color="#000"/> we can add a CNAME record which allows Cloudflare to direct traffic to <Now color="#000"/>. If we want to serve `ui.my-app.work` we need to add a CNAME with the following information:


* Name: `ui`
* Domain: `alias.zeit.co`

> You can also use @ as the Name of the CNAME record. Then, the record applies to the root domain, `my-app.work`.


Make sure to **uncheck** the cloud symbol for the Record. So, Cloudflare only acts as a DNS server for this subdomain.
(It should look like the below)

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/how-to-use-cloudflare/cloudflare-dns-records.png`)}
  width={600}
  height={259}
/>

### 3. Alias Inside Now

Finally alias  `ui.my-app.work` for any deployment in <Now color="#000"/>:

<TerminalInput>now alias hello-szrpyfhgwp.now.sh ui.my-app.work</TerminalInput>

Then, you can access the deployment via [https://ui.my-app.work](https://ui.my-app.work/) in no time.

### 4. Next Sub-Domain

For the next sub-domain, you only need to follow Step 2 and 3. Setup (Step 1) is a one time job.

## Cloudflare as a Proxy Server

In the above case, Cloudflare only acts as a DNS server. It simply forwards the traffic to <Now color="#000"/> via DNS. With this mode, Cloudflare accepts the traffic and acts as a proxy server. This allows Cloudflare to do interesting things like OneClick SSL, DDOS protection, CDN features and more.

To get started, we need to apply all of the above steps. Then, go through the following steps:

### 1. Enable the Proxy Mode

For that, simply check the Cloud icon next to the Domain name (in the DNS settings page). Then it'll look like this:

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/how-to-use-cloudflare/cloudflare-dns-proxy-mode.png`)}
  width={600}
  height={259}
/>

### 2. Use Full (Strict) Encryption

With this setup, Cloudflare communicates with <Now color="#000"/> using SSL. This is very important since <Now color="#000"/> serves pages via HTTPS only.

For that, go to the Crypto settings page and select the Full (Strict) mode.

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/how-to-use-cloudflare/cloudflare-full-strict-ssl.png`)}
  width={600}
  height={321}
/>

### 3. Allow Now to Renew Certificates

With the above step, Cloudflare communicates via <Now color="#000"/> using SSL. <Now color="#000"/> uses LetsEncrypt to issue SSL certificates. So, it needs to renew the certificate from time to time.

As a part of that, LetsEncrypt needs to access a special URL of your app (without SSL). So, Cloudflare should not serve that URL with SSL. For that, we need to add a Cloudflare page rule as shown below:

The URL should be: `*my-app.work/.well-known/acme-challenge/*`  and the setting should be **SSL=OFF**.

> You need to replace **my-app.work** with your domain name.

This is what it looks like when creating the rule:

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/how-to-use-cloudflare/cloudflare-page-rule-ssl-off.png`)}
  width={600}
  height={344}
/>

Finally, make sure to keep the above rule on the top of the list. Otherwise, it'll get overridden by some other rule like “Always Use HTTPS”.

<Image
  src={asset(`${IMAGE_ASSETS_URL}/docs/how-to-use-cloudflare/cloudflare-page-rules-ssl-off-on-top.png`)}
  width={600}
  height={107}
/>

### 4. Next Sub-Domain

For your next sub-domain, you only need to follow step 1.

export default withDoc({...meta})(({children}) => <>{children}</>)
