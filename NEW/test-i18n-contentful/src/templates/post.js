import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({
  data: {
    post: {
      title,
      content: {
        article: { html },
      },
    },
  },
}) => (
  <Layout>
    <SEO title={title} />
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

export const postQuery = graphql`
  query($slug: String!) {
    post: contentfulBlog(slug: { eq: $slug }) {
      title
      content {
        article: childMarkdownRemark {
          html
          timeToRead
        }
      }
    }
  }
`
