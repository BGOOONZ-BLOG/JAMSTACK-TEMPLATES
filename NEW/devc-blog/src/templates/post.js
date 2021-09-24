import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({
  data: {
    post: {
      html,
      frontmatter: { title },
    },
  },
}) => (
  <Layout>
    <h1>{title}</h1>
    <Wrapper dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

const Wrapper = styled.div`
  padding: 2rem;
  box-shadow: 1px 0 10px 0 rgba(0, 0, 0, 0.4);
`

export const postQuery = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
