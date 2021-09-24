export default `
query checkout($id: ID!) {
  node(id: $id) {
    ... on CheckoutNode {
      products {
        edges {
          node {
            slug
          }
        }
      }
    }
  }
}`;
