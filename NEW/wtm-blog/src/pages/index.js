import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default () => {
  const { posts } = useStaticQuery(graphql`
    {
      posts: allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <h2>My beautiful blog</h2>
      {posts.edges.map(({ node: { id, frontmatter: { slug, title } } }) => (
        <ul key={id}>
          <li>
            <Link to={slug}>{title}</Link>
          </li>
        </ul>
      ))}
    </Layout>
  )
}
