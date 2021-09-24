import * as React from 'react'
import { Fragment, SFC } from 'react'
import { PageProps } from 'docz'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'

import { Container } from './Container'
import { Sidebar, Topbar } from '@components/shared'
import { breakpoints } from '@styles/responsive'

const Wrapper = styled.div`
  flex: 1;
  margin-top: 60px;

  ${Container} {
    display: flex;
    min-height: 100%;

    ${p =>
      p.theme.mq({
        padding: ['0 10px', '0 20px'],
      })}
  }
`

const Document = styled.div`
  max-width: 100%;

  ${p =>
    p.theme.mq({
      paddingTop: ['10px', '30px'],
    })}
`

export const Page: SFC<PageProps> = ({ children, doc, location }) => {
  const { parent, fullpage } = doc
  const { width } = useWindowSize()
  const isAtLeastDesktop = width > breakpoints.tablet
  const showSidebar = Boolean(parent)
  const menuParent = parent || doc.name
  const pathname = location && location.pathname

  return (
    <React.Fragment>
      <Topbar />
      <Wrapper>
        {!isAtLeastDesktop && (
          <Sidebar menu={menuParent} pathname={pathname} mobile />
        )}
        {fullpage ? (
          <Fragment>{children}</Fragment>
        ) : (
          <Container>
            {isAtLeastDesktop && showSidebar && (
              <Sidebar menu={menuParent} pathname={pathname} />
            )}
            <Document>{children}</Document>
          </Container>
        )}
      </Wrapper>
    </React.Fragment>
  )
}
