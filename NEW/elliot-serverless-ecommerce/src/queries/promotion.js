export default `
query checkout($id: ID!) {
  node(id: $id) {
    ... on CheckoutNode {
      promotion {
        discountType
        discountValue
        endDatetime
        startDatetime
        stripeCouponCode
      }
    }
  }
}
`;
