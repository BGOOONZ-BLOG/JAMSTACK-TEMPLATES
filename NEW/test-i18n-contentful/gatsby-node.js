const path = require('path')
const blogQuery = require('./blogQuery')

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const postTemplate = path.resolve('./src/templates/post.js')

    const res = await graphql(blogQuery)

    res.data.posts.edges.forEach(({ node: { slug } }) => {
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
