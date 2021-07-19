import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"

export default function Root(props) {
  return (
    <Layout>
      {props.data.markdown.nodes.map(node => {
        return (
          <Link
            key={node.gatsbyPath}
            to={node.gatsbyPath}
            data-testid="collection-routing-blog"
            data-testslug={node.fields.slug}
          >
            {node.frontmatter.title}
          </Link>
        )
      })}
      {props.data.images.nodes.map(node => {
        return (
          <Link
            key={node.gatsbyPath}
            to={node.gatsbyPath}
            data-testid="collection-routing-image"
            data-testimagename={node.parent.name}
          >
            {node.parent.name}
          </Link>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query AllMarkdown {
    markdown: allMarkdownRemark {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
        gatsbyPath(
          filePath: "/collection-routing/{MarkdownRemark.fields__slug}"
        )
      }
    }

    images: allImageSharp(limit: 1, skip: 1) {
      nodes {
        parent {
          ... on File {
            name
          }
        }
        gatsbyPath(
          filePath: "/collection-routing/{ImageSharp.parent__(File)__name}"
        )
      }
    }
  }
`
