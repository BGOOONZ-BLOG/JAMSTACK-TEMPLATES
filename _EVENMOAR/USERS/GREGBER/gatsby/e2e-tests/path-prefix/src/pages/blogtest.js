import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const Blogtest = () => (
  <Layout>
    <h1>Hi from the blogtest page</h1>
    <p>Welcome to page blogtest</p>
    <Link data-testid="index-link" to="/">
      Go back to the homepage
    </Link>
  </Layout>
)

export default Blogtest
