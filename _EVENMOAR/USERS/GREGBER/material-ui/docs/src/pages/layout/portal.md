---
components: Portal
---

# Portal

The portal component renders its children into a new "subtree"
outside of current component hierarchy.
The children of the portal component will be appended to the `container` specified.

The component is used internally by the [`Modal`](/api/modal) component.
On the server, the content won't be rendered.
You have to wait for the client side reconciliation to see the children.

## Simple Portal

{{"demo": "pages/layout/SimplePortal.js"}}
