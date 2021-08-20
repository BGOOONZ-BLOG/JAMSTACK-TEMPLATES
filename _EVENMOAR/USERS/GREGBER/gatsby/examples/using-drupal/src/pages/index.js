import React from "react"
import { Link, graphql } from "gatsby"
import gray from "gray-percentage"
import Img from "gatsby-image"

import Layout from "../layouts"
import Container from "../components/container"
import { rhythm } from "../utils/typography"
import constants from "../utils/constants"

class IndexPage extends React.Component {
  render() {
    const data = this.props.data
    const topRecipe = data.topRecipe.edges[0].node
    const nextTwoPromotedRecipes = data.nextTwoPromotedRecipes.edges.map(
      edge => edge.node
    )
    const nextFourPromotedRecipes = data.nextFourPromotedRecipes.edges.map(
      edge => edge.node
    )

    const FirstPromoted = ({ recipe }) => (
      <Link
        to={recipe.fields.slug}
        css={{
          display: `block`,
          color: `inherit`,
          border: `1px solid ${gray(80)}`,
          marginBottom: rhythm(1),
          "@media(min-width: 800px)": {
            marginBottom: 0,
            width: `calc(1/2*100% - (1 - 1/2) * ${rhythm(1 / 2)})`,
          },
        }}
      >
        <div
          css={{
            display: `inline-block`,
            padding: `${rhythm(3 / 4)} ${rhythm(1)}`,
          }}
        >
          <h4
            css={{
              fontFamily: `"Josefin Sans", sans-serif`,
              fontWeight: 400,
              margin: 0,
              color: gray(50),
            }}
          >
            Our Recipe Pick
          </h4>
          <h2>{recipe.title}</h2>
        </div>
        <Img
          fluid={recipe.relationships.image.localFile.childImageSharp.fluid}
        />
      </Link>
    )

    const PromotedCard = ({
      recipe,
      square = false,
      columns = 4,
      marginBottom = rhythm(1 / 2),
    }) => (
      <Link
        to={recipe.fields.slug}
        css={{
          color: `inherit`,
          textDecoration: `none`,
          display: `inline-block`,
          border: `1px solid ${gray(80)}`,
          width: `calc(1/${columns}*100% - (1 - 1/${columns}) * ${rhythm(
            1 / 2
          )})`,
          marginBottom,
        }}
      >
        <Img
          fluid={recipe.relationships.image.localFile.childImageSharp.fluid}
        />
        <div
          css={{
            padding: `${rhythm(3 / 4)} ${rhythm(1)}`,
            width:
              recipe.relationships.image.localFile.childImageSharp.fluid.width,
            height: square
              ? recipe.relationships.image.localFile.childImageSharp.fluid
                  .height
              : undefined,
          }}
        >
          <h4
            css={{
              fontFamily: `"Josefin Sans", sans-serif`,
              fontWeight: 400,
              marginBottom: rhythm(1 / 4),
              color: gray(50),
            }}
          >
            {recipe.relationships.category.name}
          </h4>
          <h3>{recipe.title}</h3>
        </div>
      </Link>
    )

    return (
      <Layout>
        <div css={{ overflow: `hidden` }}>
          <Container>
            <div
              css={{
                "@media(min-width: 800px)": {
                  display: `flex`,
                  justifyContent: `space-between`,
                },
              }}
            >
              <FirstPromoted recipe={topRecipe} />
              {nextTwoPromotedRecipes.map(recipe => (
                <PromotedCard
                  recipe={recipe}
                  square={true}
                  columns={4}
                  marginBottom={0}
                  key={recipe.fields.slug}
                />
              ))}
            </div>
          </Container>

          <div
            css={{
              background: constants.darkYellow,
            }}
          >
            <Container
              css={{
                paddingLeft: rhythm(4),
              }}
            >
              <div css={{ maxWidth: rhythm(15) }}>
                <h2>In this {`month's`} edition</h2>
                <p>
                  Quisque vitae pulvinar arcu. Aliquam ac pellentesque erat, at
                  finibus massa.
                </p>
                <p>
                  {` `}
                  Suspendisse eget • leo sed • felis commodo • semper id • sed
                  erat
                </p>
                <button
                  css={{
                    background: constants.darkGray,
                    color: gray(75, 0, true),
                    padding: `${rhythm(1 / 3)} ${rhythm(2 / 3)}`,
                    lineHeight: 1.3,
                    cursor: `pointer`,
                  }}
                >
                  More Umami
                </button>
              </div>
            </Container>
          </div>

          <Container>
            <h1 css={{ textAlign: `center` }}>Recipes</h1>
            <h2 css={{ textAlign: `center` }}>
              Explore recipes across every type of occasion, ingredients, and
              skill level
            </h2>
            <div
              css={{
                display: `flex`,
                justifyContent: `space-between`,
                flexWrap: `wrap`,
              }}
            >
              {nextFourPromotedRecipes.map(recipe => (
                <PromotedCard
                  recipe={recipe}
                  columns={2}
                  key={recipe.fields.slug}
                />
              ))}
            </div>
          </Container>

          <div
            css={{
              background: constants.darkYellow,
            }}
          >
            <Container>
              <h2>Umami Magazine</h2>
              <p>
                Umami Publications example footer content. Integer posuere erat
                a ante venenatis dapibus posueure velit aliquet. Sed posueure
                consectetur est at lobortis. Donec id elit non mi porta.
              </p>
            </Container>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    topRecipe: allNodeRecipe(sort: { fields: [created] }, limit: 1) {
      edges {
        node {
          title
          fields {
            slug
          }
          relationships {
            image: field_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 740, maxHeight: 555) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    nextTwoPromotedRecipes: allNodeRecipe(
      sort: { fields: [created] }
      limit: 2
      skip: 1
    ) {
      edges {
        node {
          title
          fields {
            slug
          }
          relationships {
            category: field_recipe_category {
              name
            }
            image: field_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 240, maxHeight: 240) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    nextFourPromotedRecipes: allNodeRecipe(
      sort: { fields: [created] }
      limit: 4
      skip: 3
    ) {
      edges {
        node {
          title
          fields {
            slug
          }
          relationships {
            category: field_recipe_category {
              name
            }
            image: field_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 475, maxHeight: 475) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
