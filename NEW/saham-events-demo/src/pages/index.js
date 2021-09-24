import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => {
  const { events } = useStaticQuery(graphql`
    {
      events: allEventsYaml {
        edges {
          node {
            slug
            state
            title
            description
            id
          }
        }
      }
    }
  `)
  return (
  <Layout>
    {events.edges.map(({ node: {
      id,
      state,
      title,
      description,
      slug
    }}) => (
      <div key={id}>
        <Link to={slug}>
          <h1>{title}</h1>
        </Link>
        <p>{description}</p>
        <span>{state}</span>
      </div>
    ))}
  </Layout>
)}

export default IndexPage
