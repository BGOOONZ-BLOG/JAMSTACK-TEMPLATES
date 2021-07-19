import withDoc from '../../../lib/with-doc'

export const meta = {
  title: 'Support Channels',
  description: 'Finding help beyond documentation for ZEIT and Now',
  date: '21 Jul 2017',
  editUrl: 'pages/docs/other/support-channels.md'
}

We have a few support channels you can use to clarify doubts and solve issues.

## Platform Status
Check our [Twitter status account](https://twitter.com/zeit_status) and our [status page](https://zeit-status.co/) to verify if the platform has any issues.

## Documentation
Check the [documentation](/docs). There we have a lot of information about how you can use the CLI and the platform. It also has project examples and guides for integration with third-party services.

### API Documentation
We also have a [documentation for our API](https://zeit.co/api). If you want to build something on top of our platform you will find a lot of information about how to do so there.

## GitHub
We have many [GitHub repositories](https://github.com/zeit) for almost every service or product we have. You can create issues in those repositories and the team or community will help you as soon as possible. Some repositories you can access are [now-cloud](https://github.com/zeit/now-cloud), [now-cli](https://github.com/zeit/now-cli), [now-desktop](https://github.com/zeit/now-desktop), [now-client](https://github.com/zeit/now-client), [next.js](https://github.com/zeit/next.js), [hyper](https://github.com/zeit/hyper), [pkg](https://github.com/zeit/pkg), [micro](https://github.com/zeit/micro) and [more](https://github.com/zeit).

## zeit.chat
Our community's Slack. There you can ask for help and either the community or the ZEIT Team will answer and help you solve any doubt you have. You can access it by going to [zeit.chat](https://zeit.chat).

## Twitter
You can use Twitter to send a DM to, or mention [@zeithq](https://twitter.com/zeithq) and a team member will contact you and help you with your query.

## Email
Last but not least, you can reach out to us by email at [support@zeit.co](mailto:support@zeit.co). If you have very in-depth questions or queries related to private information (eg. billing issues) that you don't want to share in our other support channels, or you would just prefer to use email you can contact us and we will happily help you.

export default withDoc({...meta})(({children}) => <>{children}</>)
