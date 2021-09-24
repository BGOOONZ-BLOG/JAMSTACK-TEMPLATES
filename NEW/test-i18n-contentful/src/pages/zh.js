import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({
  data: {
    posts: { edges },
  },
}) => (
  <Layout>
    <SEO title="Home - En" keywords={[`gatsby`, `application`, `react`]} />
    {edges.map(({ node: { id, title, slug, description } }) => (
      <div key={id}>
        <Link to={slug}>
          <h1>{title}</h1>
        </Link>
        <p>{description}</p>
      </div>
    ))}
  </Layout>
)

export const postsQuery = graphql`
  query {
    posts: allContentfulBlog(filter: { node_locale: { eq: "zh" } }) {
      edges {
        node {
          id
          title
          slug
          description
        }
      }
    }
  }
`
