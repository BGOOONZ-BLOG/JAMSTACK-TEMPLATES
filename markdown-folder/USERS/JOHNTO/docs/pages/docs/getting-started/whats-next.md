import withDoc from '../../../lib/with-doc'
import { arunoda } from '../../../lib/data/team'
import Now from '../../../components/now/now'

export const meta = {
  title: 'What\'s Next',
  description: 'What\'s next after you\'ve got started with Now',
  date: '10 August 2017',
  authors: [arunoda],
  editUrl: 'pages/docs/getting-started/whats-next.md'
}

As you've gone through the getting started guide, you are ready to do production deployments with <Now color="#000"/>.

For additional information, follow these links:

* [Discover more with guides](/docs/deployment-types/lifecycle)
* [Try example apps](/docs/examples/json-api)
* [Connect with our support channels](/docs/other/support-channels)
* [Check the frequently asked questions (FAQ)](/docs/other/faq)

export default withDoc({...meta})(({children}) => <>{children}</>)
