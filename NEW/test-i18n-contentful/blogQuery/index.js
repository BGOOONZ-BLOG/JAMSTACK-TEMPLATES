module.exports = `
{
  posts: allContentfulBlog {
    edges {
      node {
        slug
      }
    }
  }
}
`
