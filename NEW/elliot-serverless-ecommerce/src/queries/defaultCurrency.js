export default `
query checkout($id: ID!) {
  node(id: $id) {
    ... on CheckoutNode {
      domain {
        company {
          currency
        }
      }
    }
  }
}
`;
