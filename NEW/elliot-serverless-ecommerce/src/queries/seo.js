export default `
query checkout($id: ID!) {
  node(id: $id) {
    ... on CheckoutNode {
      lookAndFeel {
        seo
      }
      domain {
        branding {
          logo
        }
      }
    }
  }
}
`;
