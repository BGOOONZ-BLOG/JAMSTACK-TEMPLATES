import React from "react"
import { Link, graphql } from "gatsby"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"
import Layout from "../layouts"

import { rhythm } from "../utils/typography"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.data.contentfulCategory
    const {
      title: { title },
      product,
      icon,
    } = category
    const iconImg = icon.fixed
    return (
      <Layout>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            marginBottom: rhythm(1 / 2),
          }}
        >
          <Img
            style={{
              height: iconImg.height,
              width: iconImg.width,
              marginRight: rhythm(1 / 2),
            }}
            fixed={iconImg}
          />
          <h4 style={{ marginBottom: 0 }}>{title}</h4>
        </div>
        <h1>{title}</h1>
        <div>
          <span>Products</span>
          <ul>
            {product &&
              product.map((p, i) => (
                <li key={i}>
                  <Link to={`/products/${p.id}`}>
                    {p.productName.productName}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </Layout>
    )
  }
}

CategoryTemplate.propTypes = propTypes

export default CategoryTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulCategory(id: { eq: $id }) {
      title {
        title
      }
      icon {
        fixed(width: 75) {
          base64
          src
          srcSet
          height
          width
        }
      }
      product {
        id
        productName {
          productName
        }
      }
    }
  }
`
