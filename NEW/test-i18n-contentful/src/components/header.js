import { Link } from 'gatsby'
import React from 'react'

export default () => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <h4 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Test
        </Link>
      </h4>
      <h4 style={{ margin: 0 }}>
        <Link
          to="/zh"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Chinese
        </Link>
      </h4>
    </div>
  </header>
)
