module.exports = `
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
`;
