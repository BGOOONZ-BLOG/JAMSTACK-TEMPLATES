const config = require("./src/data");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = ({ contentPath = `${__dirname}/src/content` }) => {
  return {
    plugins: [
      "gatsby-transformer-remark",
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-styled-components",
      {
        resolve: "gatsby-mdx",
        options: {
          defaultLayouts: {
            default: require.resolve("./src/components/common/Layout/index.jsx")
          }
        }
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: `${__dirname}/src/pages`
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content`,
          path: contentPath
        }
      },
      {
        resolve: "gatsby-source-graphql",
        options: {
          typeName: "GitHub",
          fieldName: "github",
          url: "https://api.github.com/graphql",
          headers: {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`
          },
          fetchOptions: {},
          variables: {
            username: "smakosh"
          }
        }
      },
      {
        resolve: "gatsby-plugin-nprogress",
        options: {
          color: config.themeColor,
          showSpinner: false
        }
      },
      {
        resolve: "gatsby-plugin-google-analytics",
        options: {
          trackingId: config.googleAnalyticsID,
          head: true
        }
      },
      {
        resolve: "gatsby-plugin-favicon",
        options: {
          logo: "./static/favicon/favicon-512.png",
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
            windows: false
          }
        }
      },
      {
        resolve: "gatsby-plugin-manifest",
        options: {
          name: config.defaultTitle,
          short_name: "example",
          start_url: "/",
          background_color: config.backgroundColor,
          theme_color: config.themeColor,
          display: "minimal-ui",
          icon: "./static/favicon/favicon-512.png"
        }
      }
      // 'gatsby-plugin-offline',
    ]
  };
};
