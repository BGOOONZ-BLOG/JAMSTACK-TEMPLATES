export default `
query product($domainId: ID!, $slug: String!) {
  node(id: $domainId) {
    ... on DomainNode {
      products(slug: $slug) {
        edges {
          node {
            id
            createdOn
            name
            gender
            variantCount
            description
            shortDescription
            insuranceAmount
            quantity
            slug
            unitOfWeight
            unitOfDimensions
            productSeo {
              edges {
                node {
                  title
                  description
                }
              }
            }
            attributes
            ... on ProductNode {
              relatedProducts {
                edges {
                  node {
                    id
                    name
                    gender
                    variantCount
                    description
                    insuranceAmount
                    quantity
                    slug
                    unitOfWeight
                    unitOfDimensions
                    productSeo {
                      edges {
                        node {
                          title
                          description
                        }
                      }
                    }
                    attributes
                    collections {
                      edges {
                        node {
                          id
                          name
                          slug
                        }
                      }
                    }
                    skus {
                      edges {
                        node {
                          id
                          sku
                          width
                          height
                          length
                          unitOfDimensions
                          unitOfWeight
                          salePrice
                          basePrice
                          weight
                          attributes
                          stripeId
                          orderSkus {
                            edges {
                              node {
                                sku {
                                  id
                                  sku
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    vendor {
                      id
                      profile(domainId: $domainId) {
                        edges {
                          node {
                            id
                            avatar
                            bio
                            label
                            name
                            address1
                            address2
                            city
                            state
                            zipCode
                            country
                            email
                            phoneNumber
                            stripeConnectUserId
                            paypalPayoutEmail
                            domainCommission
                            slug
                          }
                        }
                      }
                    }
                    metadata {
                      edges {
                        node {
                          productCategoryTag1
                          productCategoryTag2
                          productCategoryTag3
                        }
                      }
                    }
                    images(orderBy: "orderingPosition") {
                      edges {
                        node {
                          id
                          image
                        }
                      }
                    }
                  }
                }
              }
              collections {
                edges {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
              skus {
                edges {
                  node {
                    id
                    sku
                    width
                    height
                    length
                    unitOfDimensions
                    unitOfWeight
                    salePrice
                    basePrice
                    weight
                    attributes
                    stripeId
                    orderSkus {
                      edges {
                        node {
                          sku {
                            id
                            sku
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            vendor {
              id
              profile(domainId: $domainId) {
                edges {
                  node {
                    id
                    avatar
                    bio
                    label
                    name
                    address1
                    address2
                    city
                    state
                    zipCode
                    country
                    email
                    phoneNumber
                    stripeConnectUserId
                    paypalPayoutEmail
                    domainCommission
                    slug
                  }
                }
              }
            }
            metadata {
              edges {
                node {
                  productCategoryTag1
                  productCategoryTag2
                  productCategoryTag3
                }
              }
            }
            images(orderBy: "orderingPosition") {
              edges {
                node {
                  id
                  image
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
