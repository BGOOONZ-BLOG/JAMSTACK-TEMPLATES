module.exports = {
  siteMetadata: {
    title: `gatsby-example-using-csv`,
    description: `Blazing fast modern site generator for React`,
  },
  plugins: [
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-93349937-2`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: `data`,
      },
    },
  ],
}
