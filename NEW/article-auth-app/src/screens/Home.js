import React from 'react'
import Home from 'src/modules/dashboard/Home'
import Layout from 'src/components/Layout'

export default ({ token }) => (
  <Layout>
    <Home token={token} />
  </Layout>
)
