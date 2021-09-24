import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data: { post } }) => (
  <Layout>
    <div>
      <h2>{post.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </Layout>
)

export const postQuery = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`
