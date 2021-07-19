import React from "react"
import { Link } from "gatsby"
import "./index.styl"

class CssModules extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="the-stylus-class">Hi stylish friends</h1>
          <p>
            All of the styles for this page are written using
            {` `}
            <a href="https://github.com/stylus/stylus">Stylus</a>.
          </p>
          <Link to="/css-modules/" className="cta">
            View the CSS Modules example
          </Link>
        </header>
        <section className="main">
          <div className="stylus-nav-example">
            <h2>Nav example</h2>
            <ul>
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Store</a>
              </li>
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Help</a>
              </li>
              <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Logout</a>
              </li>
            </ul>
          </div>
          <div className="grid">
            <div>1</div>
            <div>2</div>
            <div>2</div>
          </div>
        </section>
      </div>
    )
  }
}

export default CssModules
