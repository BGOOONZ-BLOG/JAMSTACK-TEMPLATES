const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const postTemplate = path.resolve('./src/templates/post.js')

    const res = await graphql(`
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

    res.data.posts.edges.map(({ node: { frontmatter: { slug } } }) => {
      createPage({
        path: slug,
        component: postTemplate,
        context: {
          slug,
        },
      })
    })

    if (res.errors) {
      throw new Error(res.errors)
    }
  } catch (err) {
    console.log(err)
  }
}
