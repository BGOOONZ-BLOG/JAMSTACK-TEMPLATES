# gatsby-source-contentful

Source plugin for pulling content types, entries, and assets into Gatsby from
Contentful spaces. It creates links between entry types and asset so they can be
queried in Gatsby using GraphQL.

An example site for using this plugin is at
https://using-contentful.gatsbyjs.org/

## Install

```shell
npm install --save gatsby-source-contentful
```

## How to use

First, you need a way to pass environment variables to the build process, so secrets and other secured data aren't committed to source control. We recommend using [`dotenv`][dotenv] which will then expose environment variables. [Read more about dotenv and using environment variables here][envvars]. Then we can _use_ these environment variables and configure our plugin.

### Using Delivery API

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_space_id`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
```

### Using Preview API

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_space_id`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: `preview.contentful.com`,
      },
    },
  ],
}
```

### Download assets for static distribution

Downloads and caches Contentful Assets to the local filesystem. Useful for reduced data usage in development or projects where you want the assets copied locally with builds for deploying without links to Contentful's CDN.

Enable this feature with the `downloadLocal: true` option.

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_space_id`,
        // Learn about environment variables: https://gatsby.app/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
  ],
}
```

Query a `ContentfulAsset`'s `localFile` field in GraphQL to gain access to the common fields of the `gatsby-source-filesystem` `File` node. This is not a Contentful node, so usage for `gatsby-image` is different:

```graphql
  query MyQuery {
    # Example is for a `ContentType` with a `ContentfulAsset` field
    # You could also query an asset directly via
    # `allContentfulAsset { edges{ node { } } }`
    # or `contentfulAsset(contentful_id: { eq: "contentful_id here" } ) { }`
    contentfulMyContentType {
      myContentfulAssetField {
        # Direct URL to Contentful CDN for this asset
        file { url }

        # Query for a fluid image resource on this `ContentfulAsset` node
        fluid(maxWidth: 500){
          ...GatsbyContentfulFluid_withWebp
        }

        # Query for locally stored file(e.g. An image) - `File` node
        localFile {
          # Where the asset is downloaded into cache, don't use this
          absolutePath
          # Where the asset is copied to for distribution, equivalent to using ContentfulAsset `file {url}`
          publicURL
          # Use `gatsby-image` to create fluid image resource
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
```

Note: This feature downloads any file from a `ContentfulAsset` node that `gatsby-source-contentful` provides. They are all copied over from `./cache/gatsby-source-filesystem/` to the sites build location `./public/static/`.

For any troubleshooting related to this feature, first try clearing your `./cache/` directory. `gatsby-source-contentful` will acquire fresh data, and all `ContentfulAsset`s will be downloaded and cached again.

### Offline

If you don't have internet connection you can add `export GATSBY_CONTENTFUL_OFFLINE=true` to tell the plugin to fallback to the cached data, if there is any.

### Configuration options

**`spaceId`** [string][required]

Contentful spaceId

**`accessToken`** [string][required]

Contentful delivery api key, when using the Preview API use your Preview API key

**`host`** [string][optional] [default: `'cdn.contentful.com'`]

The base host for all the API requests, by default it's 'cdn.contentful.com', if you want to use the Preview API set it to `'preview.contentful.com'`. You can use your own host for debugging/testing purposes as long as you respect the same Contentful JSON structure.

**`environment`** [string][optional] [default: 'master']

The environment to pull the content from, for more info on environments check out this [Guide](https://www.contentful.com/developers/docs/concepts/multiple-environments/).

**`downloadLocal`** [boolean][optional] [default: `false`]

Downloads and caches `ContentfulAsset`'s to the local filesystem. Allows you to query a `ContentfulAsset`'s `localFile` field, which is not linked to Contentful's CDN. Useful for reducing data usage.

You can pass in any other options available in the [contentful.js SDK](https://github.com/contentful/contentful.js#configuration).

**`localeFilter`** [function][optional] [default: `() => true`]

Possibility to limit how many locales/nodes are created in GraphQL. This can limit the memory usage by reducing the amount of nodes created. Useful if you have a large space in contentful and only want to get the data from one selected locale.

For example, to filter locales on only germany `localeFilter: locale => locale.code === 'de-DE'`

List of locales and their codes can be found in Contentful app -> Settings -> Locales

**`forceFullSync`** [boolean][optional] [default: `false`]

Prevents the use of sync tokens when accessing the Contentful API.

**`proxy`** [object][optional] [default: `undefined`]

Axios proxy configuration. See the [axios request config documentation](https://github.com/mzabriskie/axios#request-config) for further information about the supported values.

**`useNameForId`** [boolean][optional] [default: `true`]

Use the content's `name` when generating the GraphQL schema e.g. a Content Type called `[Component] Navigation bar` will be named `contentfulComponentNavigationBar`.

When set to `false`, the content's internal ID will be used instead e.g. a Content Type with the ID `navigationBar` will be called `contentfulNavigationBar`.

Using the ID is a much more stable property to work with as it will change less often. However, in some scenarios, Content Types' IDs will be auto-generated (e.g. when creating a new Content Type without specifying an ID) which means the name in the GraphQL schema will be something like `contentfulC6XwpTaSiiI2Ak2Ww0oi6qa`. This won't change and will still function perfectly as a valid field name but it is obviously pretty ugly to work with.

If you are confident your Content Types will have natural-language IDs (e.g. `blogPost`), then you should set this option to `false`. If you are unable to ensure this, then you should leave this option set to `true` (the default).

**`pageLimit`** [number][optional] [default: `100`]

Number of entries to retrieve from Contentful at a time. Due to some technical limitations, the response payload should not be greater than 7MB when pulling content from Contentful. If you encounter this issue you can set this param to a lower number than 100, e.g `50`.

**`richText.resolveFieldLocales`** [boolean][optional] [default: `false`]

If you want to resolve the locales in fields of assets and entries that are referenced by rich text (e.g., via embedded entries or entry hyperlinks), set this to `true`. Otherwise, fields of referenced assets or entries will be objects keyed by locale.

## Notes on Contentful Content Models

There are currently some things to keep in mind when building your content models at Contentful.

1.  At the moment, fields that do not have at least one populated instance will not be created in the GraphQL schema.

2.  When using reference fields, be aware that this source plugin will automatically create the reverse reference. You do not need to create references on both content types.

## How to query for nodes

Two standard node types are available from Contentful: `Asset` and `ContentType`.

`Asset` nodes will be created in your site's GraphQL schema under `contentfulAsset` and `allContentfulAsset`.

`ContentType` nodes are a little different - their exact name depends on what you called them in your Contentful data models. The nodes will be created in your site's GraphQL schema under `contentful${entryTypeName}` and `allContentful${entryTypeName}`.

In all cases querying for nodes like `contentfulX` will return a single node, and nodes like `allContentfulX` will return all nodes of that type.

### Query for all nodes

You might query for **all** of a type of node:

```graphql
{
  allContentfulAsset {
    edges {
      node {
        id
        file {
          url
        }
      }
    }
  }
}
```

You might do this in your `gatsby-node.js` using Gatsby's [`createPages`](https://next.gatsbyjs.org/docs/node-apis/#createPages) Node API.

### Query for a single node

To query for a single `image` asset with the title 'foo' and a width of 1600px:

```javascript
export const assetQuery = graphql`
  {
    contentfulAsset(filter: { title: { eq: 'foo' } }) {
      image {
        resolutions(width: 1600) {
          width
          height
          src
          srcSet
        }
      }
    }
  }
`
```

To query for a single `CaseStudy` node with the short text properties `title` and `subtitle`:

```graphql
  {
    contentfulCaseStudy(filter: { title: { eq: 'bar' } })  {
      title
      subtitle
    }
  }
```

> Note the use of [GraphQL arguments](https://graphql.org/learn/queries/#arguments) on the `contentfulAsset` and `resolutions` fields. See [Gatsby's GraphQL reference docs for more info](https://www.gatsbyjs.org/docs/graphql-reference/).

You might query for a **single** node inside a component in your `src/components` folder, using [Gatsby's `StaticQuery` component](https://www.gatsbyjs.org/docs/static-query/).

#### A note about LongText fields

On Contentful, a "Long text" field uses Markdown by default. The field is exposed as an object, while the raw Markdown is exposed as a child node.

```graphql
{
  contentfulCaseStudy {
    body {
      body
    }
  }
}
```

Unless the text is Markdown-free, you cannot use the returned value directly. In order to handle the Markdown content, you must use a transformer plugin such as [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/). The transformer will create a childMarkdownRemark on the "Long text" field and expose the generated html as a child node:

```graphql
{
  contentfulCaseStudy {
    body {
      childMarkdownRemark {
        html
      }
    }
  }
}
```

You can then insert the returned HTML inline in your JSX:

```jsx
<div
  className="body"
  dangerouslySetInnerHTML={{
    __html: data.contentfulCaseStudy.body.childMarkdownRemark.html,
  }}
/>
```

#### Duplicated entries

When Contentful pulls the data, all localizations will be pulled. Therefore, if you have a localization active, it will duplicate the entries. Narrow the search by filtering the query with `node_locale` filter:

```graphql
{
  allContentfulCaseStudy(filter: { node_locale: { eq: "en-US" } }) {
    edges {
      node {
        id
        slug
        title
        subtitle
        body {
          body
        }
      }
    }
  }
}
```

### Query for Assets in ContentType nodes

More typically your `Asset` nodes will be mixed inside of your `ContentType` nodes, so you'll query them together. All the same formatting rules for `Asset` and `ContentType` nodes apply.

To get **all** the `CaseStudy` nodes with ShortText fields `id`, `slug`, `title`, `subtitle`, LongText field `body` and heroImage `Asset` field, we use `allContentful${entryTypeName}` to return all instances of that `ContentType`:

```graphql
{
  allContentfulCaseStudy {
    edges {
      node {
        id
        slug
        title
        subtitle
        body {
          body
        }
        heroImage {
          fixed(width: 1600) {
            width
            height
            src
            srcSet
          }
        }
      }
    }
  }
}
```

When querying images you can use the `fixed`, `fluid` or `resize` nodes to get different sizes for the image (for example for using [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/)). Their usage is documented at the [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/) package. The only difference is that gatsby-source-contentful also allows setting only the `width` parameter for these node types, the height will then automatically be calculated according to the aspect ratio.

## More on Queries with Contentful and Gatsby

It is strongly recommended that you take a look at how data flows in a real Contentful and Gatsby application to fully understand how the queries, Node.js functions and React components all come together. Check out the example site at
[using-contentful.gatsbyjs.org](https://using-contentful.gatsbyjs.org/).

## [Contentful Rich Text](https://www.contentful.com/developers/docs/concepts/rich-text/)

Rich Text feature is supported in this source plugin, you can use the following query to get the json output:

```graphql
{
  allContentfulBlogPost {
    edges {
      node {
        bodyRichText {
          json
        }
      }
    }
  }
}
```

To define a way Rich Text document is rendered, you can use `@contentful/rich-text-react-renderer` package:

```jsx
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

documentToReactComponents(node.bodyRichText.json, options)
```

Check out the examples at [@contentful/rich-text-react-renderer](https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer).

## Sourcing From Multiple Contentful Spaces

To source from multiple Contentful environments/spaces, add another configuration for `gatsby-source-contentful` in `gatsby-config.js`:

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_space_id`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_second_space_id`,
        accessToken: process.env.SECONDARY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
```

[dotenv]: https://github.com/motdotla/dotenv
[envvars]: https://gatsby.dev/env-vars
