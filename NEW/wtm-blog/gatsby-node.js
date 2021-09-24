const path = require("path")

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const postTemplate = path.resolve("./src/templates/post.js")

    const { data } = await graphql(`
      {
        posts: allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)

    data.posts.edges.forEach(
      ({
        node: {
          frontmatter: { slug },
        },
      }) => {
        createPage({
          component: postTemplate,
          path: slug,
          context: {
            slug,
          },
        })
      }
    )
  } catch (err) {
    console.log(err)
  }
}
