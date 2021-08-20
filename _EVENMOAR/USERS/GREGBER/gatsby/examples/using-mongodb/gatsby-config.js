module.exports = {
  siteMetadata: {
    title: `Gatsby with MongoDB`,
  },
  plugins: [
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: `cloud`,
        collection: `documents`,
        server: { address: `ds143532.mlab.com`, port: 43532 },
        auth: { user: `admin`, password: `12345` },
        map: { documents: { description: `text/markdown` } },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
  ],
}
