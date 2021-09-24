const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  try {
    // Get the template
    const eventTemplate = path.resolve(`src/templates/event.js`)

    const {data} = await graphql(`
      {
        events: allEventsYaml {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)

    data.events.edges.forEach(({ node: {
      slug
    }}) => {
      createPage({
        path: slug,
        component: eventTemplate,
        context: {
          slug
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}