import withDoc from '../../../lib/with-doc'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'

export const meta = {
  title: 'The Now CDN',
  description: 'Full-featured, flexible, automatic caching for Now deployments, aliases, and domains.',
  date: '10 July 2018',
  editUrl: 'pages/docs/features/cdn.md',
  image: IMAGE_ASSETS_URL + '/docs/cdn/tw-card.png'
}

Now CDN enabled domains are automatically fronted by over 150 locations, allowing you to immediately optimize all of your Now deployments with a single command.

## Getting Started
To use the CDN, you must be on a paid plan. Any new domain or `*.now.sh` alias created under a paid plan will automatically have the CDN enabled.

For any existing domains, added before the CDN was released, or domains that have had the CDN disabled, you can enable the CDN with the Now CLI by running the following command:

<TerminalInput>now domains add [your domain] --cdn</TerminalInput>

You can also enable or disable the CDN for a domain by heading to the [dashboard](https://zeit.co/dashboard) of your account or the team that holds the domain you want to enable the CDN for, then heading to the ['Domains' section](https://zeit.co/dashboard/domains). From here, you'll be able to simply click a checkbox to activate the CDN for any domain you want.

<Image
src={`${IMAGE_ASSETS_URL}/blog/cdn/activate-cdn.png`}
width={600}
height={226}
/>

If your domain isn't using zeit.world DNS yet, you first need to [migrate to zeit.world](https://zeit.co/world#get-started).

## Caching
The Cache-Control header can include a number of directives, separated by comma.

Caching directives break down the caching controls into three categories:

### Purging
When aliasing to any Now CDN enabled domain or `now.sh` alias, we automatically purge the cache so that no stale content is ever delivered.

### Expiration
* `max-age=<seconds>` indicates when response is to be considered stale. It is represented in seconds since it was downloaded from the origin server.
* `s-maxage=<seconds>` indicates when the response is to be considered stale by shared caches. It takes precedence over `max-age`.
* `no-cache` indicates the response MUST NOT be used to satisfy a subsequent request without successful validation on the origin server.


### Revalidation
* `must-revalidate` indicates that once it has become stale, a cache (client or proxy) MUST revalidate the content before using the cached entry.
* `proxy-revalidate` has the same definition as the `must-revalidate` directive, except that it only applies to shared caches.
* `stale-while-revalidate=<seconds>` indicates that caches MAY serve the response in which it appears after it becomes stale, up to the indicated number of seconds since the object expired.
* `stale-if-error=<seconds>` indicates that when an error is encountered, a cached stale response _may_ be used to satisfy the request, regardless of other freshness information.


## Other
* `no-transform` indicates that an intermediary proxy and/or cache must not transform the payload.
* `immutable` indicates to clients that the response body will not change over time.


## Recommendations
We recommend leveraging shared caches over client caches. For example, `Cache-Control: max-age=0, s-maxage=86400` may be used to instruct shared caches to cache for 86400 seconds and clients to not cache. Similarly, `Cache-Control: max-age=60, s-maxage=86400` instructs shared caches to cache for 86400 seconds and clients to cache for 60 seconds.

## Bypassing cache
If no `Cache-Control` response header is present, the Now routing layer adds `Cache-Control: s-maxage=0`, to ensure that no shared caches will cache content that wasn't explicitly marked as cacheable.

The cache is also always skipped when an [HTTP cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) named `_now_no_cache` is present or if a [query string](https://en.wikipedia.org/wiki/Query_string) parameter named `_now_no_cache=1` is present.


## Notes
Currently, the Now CDN can only be enabled for single level of subdomains. This means that, for example, `*.zeit.university` will be fronted by the CDN, while `*.dev.zeit.university` will be routed directly to our origin locations.

You can disable the CDN for a given domain by running the following command:

<TerminalInput>now domains add [your cdn enabled domain] --no-cdn</TerminalInput>

Alternatively, you can head to the [dashboard](https://zeit.co/dashboard) of your account or the team that holds the domain you want to enable the CDN for, then heading to the ['Domains' section](https://zeit.co/dashboard/domains). And deselecting the `CDN` checkbox. 

export default withDoc({...meta})(({children}) => <>{children}</>)
