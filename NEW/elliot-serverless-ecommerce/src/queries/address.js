export default `
query checkout($id: ID!) {
  node(id: $id) {
    ... on CheckoutNode {
      domain {
        company {
          address {
            address1
            city
            country
            zipCode
            phoneNumber
            email
          }
        }
      }
    }
  }
}
`;
