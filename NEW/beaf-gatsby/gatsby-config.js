const config = require('./src/data/config');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://beafapp.com',
    rssMetadata: {
      site_url: 'https://beafapp.com',
      feed_url: `${config.url}${config.siteRss}`,
      title: 'Beaf | Blog',
      description: config.defaultDescription,
      image_url: 'https://beafapp.com/static/favicon/favicon.png',
      author: config.author,
      copyright: `${config.defaultTitle} © ${new Date().getFullYear()}`,
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-remove-serviceworker',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1080,
              linkImagesToOriginal: true,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `{
					site {
						siteMetadata {
							rssMetadata {
								site_url
								title
								author
								copyright
								description
							}
						}
					}
				}`,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url:
                    site.siteMetadata.rssMetadata.site_url +
                    edge.node.frontmatter.slug,
                  guid:
                    site.siteMetadata.rssMetadata.site_url +
                    edge.node.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              ),
            query: `{
							allMarkdownRemark(
								limit: 1000,
								sort: { order: DESC, fields: [frontmatter___date] }
							) {
								edges {
									node {
										excerpt
										html
										frontmatter {
											title
											slug
											date
										}
									}
								}
							}
						}`,
            output: config.siteRss,
          },
        ],
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'images',
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MC_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://beafapp.com',
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Questrial'],
      },
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './static/favicon/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icon: './static/favicon/favicon.png',
      },
    },
    // 'gatsby-plugin-offline'
  ],
};
