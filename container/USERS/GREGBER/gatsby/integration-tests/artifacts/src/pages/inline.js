import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Inline() {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return <div>{site.siteMetadata.title}</div>
}
