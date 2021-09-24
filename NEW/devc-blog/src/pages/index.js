import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from '../components/image'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data: { posts } }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <div css="width: 200px;">
      <Image />
    </div>
    {posts.edges.map(
      ({
        node: {
          excerpt,
          id,
          frontmatter: { title, slug },
        },
      }) => (
        <div key={id} css="margin-bottom: 2rem;">
          <Link to={slug}>
            <h2>{title}</h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      )
    )}
  </Layout>
)

export const postsQuery = graphql`
  query {
    posts: allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength: 20)
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`
