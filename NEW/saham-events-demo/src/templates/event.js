import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export default ({ data: {
  event: {
    title,
    description
  }
} }) => {
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to="/">Back to events</Link>
    </Layout>
  )
}

export const eventQuery = graphql`
  query($slug: String!) {
    event: eventsYaml(slug: {eq: $slug}) {
      title
      description
    }
  }
`