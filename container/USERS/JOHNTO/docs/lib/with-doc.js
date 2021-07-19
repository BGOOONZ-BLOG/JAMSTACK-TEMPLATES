import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import formatDate from 'date-fns/format'
import Router, { withRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/tag'
// Components
import Head from '../components/head'
import Header from '../components/header'
import Heading from '../components/heading'
import Page from '../components/page'
import { P, Quote, HR } from '../components/text/paragraph'
import { UL, LI } from '../components/text/list'
import { H3, H4, H5 } from '../components/text/heading'
import { InlineCode, Code } from '../components/text/code'
import { GenericLink } from '../components/text/link'
import GitHubIcon from '../components/icons/github'
import DocsNavbarDesktop from '../components/docs/navbar/desktop'
import DocsNavbarMobile from '../components/docs/navbar/mobile'
import DocsNavbarToggle from '../components/docs/navbar/toggle'
import FreezePageScroll from '../components/freeze-page-scroll'
import data from './data/docs'
import lastEdited from './data/last-edited.json'
import authenticate from './authenticate'

const DocH2 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H3>{children}</H3>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

const DocH3 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H4>{children}</H4>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

const DocH4 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H5>{children}</H5>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

export const components = {
  p: P,
  strong: P.B,
  ul: UL,
  li: LI,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  code: Code,
  inlineCode: InlineCode,
  a: GenericLink,
  blockquote: Quote,
  hr: HR
}

const withDoc = options => {
  return WrapComponent => {
    return withRouter(
      class Doc extends React.Component {
        getInitialProps = async ({ req }) => {
          // We don't need to do any auth logic for static export
          const isServer = typeof window === 'undefined'
          if (isServer && !req.headers) {
            return {}
          }

          const { user } = await authenticate({ req })
          return { user }
        }

        render() {
          const date = lastEdited[options.editUrl]
            ? new Date(lastEdited[options.editUrl])
            : new Date()

          return (
            <MDXProvider components={components}>
              <Page>
                <Head
                  titlePrefix=""
                  titleSuffix=" - ZEIT Documentation"
                  title={`${options.title}`}
                  description={options.description}
                  image={options.image}
                  lastEdited={date}
                />
                <div className="header">
                  <Header
                    clean={true}
                    inverse={true}
                    user={this.props.user}
                    pathname={this.props.router.pathname}
                    onLogout={() => {
                      Router.push('/login')
                    }}
                    onLogoRightClick={() => this.props.url.push('/logos')}
                  />
                </div>
                <FreezePageScroll>
                  <div className="sidebar">
                    <DocsNavbarToggle />
                    <DocsNavbarDesktop
                      data={data}
                      url={this.props.router}
                      scrollSelectedIntoView={true}
                    />
                  </div>
                </FreezePageScroll>
                <div className="doc-layout">
                  <div className="topbar">
                    <DocsNavbarMobile data={data} url={this.props.router} />
                  </div>
                  <div className="content">
                    <h1 itemProp="headline">{options.title}</h1>
                    <WrapComponent {...this.props} />
                    <footer>
                      <time dateTime={lastEdited[options.editUrl]}>
                        Last Edited: {formatDate(date, 'dddd, MMMM Do YYYY')} ({distanceInWordsToNow(
                          date,
                          {
                            addSuffix: false
                          }
                        )})
                      </time>
                      <a
                        href={`https://github.com/zeit/docs/edit/master/${options.editUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Edit on GitHub</span>
                        <GitHubIcon height={16} width={16} />
                      </a>
                    </footer>
                  </div>
                </div>
                <style jsx>{`
                  .toggle {
                    display: flex;
                    flex-direction: row;
                  }

                  a {
                    text-decoration: none;
                    color: #999;
                    transition: color 0.2s ease;
                  }

                  a:hover {
                    color: #000;
                  }

                  .button:first-of-type {
                    width: 79px;
                    margin-left: 30px;
                    border-right: none;
                    border-radius: 5px 0 0 5px;
                  }

                  .button {
                    text-align: center;
                    font-size: 12px;
                    border: 1px solid #eaeaea;
                    display: inline-block;
                    padding: 5px 10px 5px 10px;
                    margin-bottom: 30px;
                    border-radius: 0 5px 5px 0;
                  }

                  .doc-layout {
                    display: flex;
                    margin: 96px 30px 50px 271px;
                    padding: 0 20px;
                    justify-content: left;
                    -webkit-font-smoothing: antialiased;
                  }

                  .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                  }

                  .sidebar {
                    position: fixed;
                    width: 240px;
                    margin-top: 0;
                    bottom: 0;
                    left: 0;
                    top: 100px;
                    overflow: auto;
                    -webkit-font-smoothing: antialiased;
                  }

                  .topbar {
                    display: none;
                  }

                  .content {
                    flex: 1;
                    max-width: 600px;
                  }

                  .content h1 {
                    color: #000;
                    font-size: 26px;
                    line-height: 1.1;
                    font-weight: 400;
                    margin: 0 0 30px 0;
                    padding: 0;
                  }

                  footer {
                    border-top: 1px solid #eaeaea;
                    padding-top: 30px;
                    display: flex;
                    justify-content: space-between;
                  }

                  footer time {
                    color: #999;
                    font-size: 14px;
                  }

                  footer a {
                    text-transform: uppercase;
                    color: black;
                    font-size: 12px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                  }

                  footer a span {
                    margin-right: 0.5em;
                  }

                  @media screen and (max-width: 950px) {
                    .header {
                      position: relative;
                    }

                    .doc-layout {
                      display: block;
                      margin: 0;
                    }

                    .content {
                      width: 100%;
                      margin-left: 0;
                    }

                    .sidebar {
                      display: none;
                    }

                    .topbar {
                      display: block;
                    }
                  }
                `}</style>
              </Page>
            </MDXProvider>
          )
        }
      }
    )
  }
}

export default withDoc
