import React from "react"

import { rhythm } from "../utils/typography"

const MainLayout = ({ children }) => (
  <div
    style={{
      margin: `0 auto`,
      marginTop: rhythm(1.5),
      marginBottom: rhythm(1.5),
      maxWidth: 650,
      paddingLeft: rhythm(3 / 4),
      paddingRight: rhythm(3 / 4),
    }}
  >
    <h1
      style={{
        marginBottom: rhythm(1.5),
        fontWeight: `normal`,
      }}
    >
      Image Processing with <code>gatsby-transformer-sharp</code>
    </h1>
    {children}
  </div>
)

export default MainLayout
