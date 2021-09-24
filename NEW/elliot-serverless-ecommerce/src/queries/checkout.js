export default `
query checkout($id: ID! $domainId: ID!) {
  node(id: $id) {
    ... on CheckoutNode {
      id
      promotion {
        id
        label
        stripeCouponCode
        startDatetime
        endDatetime
        discountValue
        discountType
      }
      shippingPreference
      shipFromLocation {
        id
        name
        address1
        address2
        city
        state
        zipCode
        country
        email
        phoneNumber
      }
      domain {
        id
        stripeConnectUserId
        owner {
          id
          profile(domainId: $domainId) {
            edges {
              node {
                id
              }
            }
          }
        }
        freeShippingThreshold
        freeShippingThresholdTarget
        company {
          currency
          name
          address {
            address1
            city
            country
            zipCode
            phoneNumber
            email
          }
        }
        vendors {
          edges {
            node {
              id
              profile(domainId: $domainId) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
