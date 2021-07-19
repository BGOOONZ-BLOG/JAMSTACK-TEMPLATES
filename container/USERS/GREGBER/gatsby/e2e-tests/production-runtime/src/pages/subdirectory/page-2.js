import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link data-testid="index-link" to="../page-1">
      Go back to page 1
    </Link>
  </Layout>
)

export default SecondPage
