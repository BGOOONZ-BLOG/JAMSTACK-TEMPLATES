import React from "react"
const { onRenderBody } = require(`../gatsby-ssr`)

it(`does not crash when no pluginConfig is provided`, () => {
  const mocks = {
    setHeadComponents: () => null,
    setPostBodyComponents: () => null,
  }

  const pluginOptions = {
    trackingIds: [`GA_TRACKING_ID`],
  }
  onRenderBody(mocks, pluginOptions)
})

const DO_NOT_TRACK_STRING = `!(navigator.doNotTrack == "1" || window.doNotTrack == "1")`

it(`adds a preconnect link for Google Analytics`, () => {
  const mocks = {
    setHeadComponents: jest.fn(),
    setPostBodyComponents: jest.fn(),
  }
  const pluginOptions = {
    trackingIds: [`GA_TRACKING_ID`],
    pluginConfig: {},
  }

  onRenderBody(mocks, pluginOptions)
  const [link] = mocks.setHeadComponents.mock.calls[0][0]

  expect(link).toEqual(
    <link
      rel="preconnect dns-prefetch"
      key="preconnect-google-analytics"
      href="https://www.google-analytics.com"
    />
  )
})

describe(`respectDNT`, () => {
  it(`defaults respectDNT option to false`, () => {
    const mocks = {
      setHeadComponents: jest.fn(),
      setPostBodyComponents: jest.fn(),
    }
    const pluginOptions = {
      trackingIds: [`GA_TRACKING_ID`],
      pluginConfig: {},
    }

    onRenderBody(mocks, pluginOptions)
    const [, config] = mocks.setPostBodyComponents.mock.calls[0][0]

    expect(config.props.dangerouslySetInnerHTML.__html).not.toContain(
      DO_NOT_TRACK_STRING
    )
  })

  it(`listens to respectDNT option`, () => {
    const mocks = {
      setHeadComponents: jest.fn(),
      setPostBodyComponents: jest.fn(),
    }
    const pluginOptions = {
      trackingIds: [`GA_TRACKING_ID`],
      pluginConfig: {
        respectDNT: true,
      },
    }

    onRenderBody(mocks, pluginOptions)
    const [, config] = mocks.setPostBodyComponents.mock.calls[0][0]

    expect(config.props.dangerouslySetInnerHTML.__html).toContain(
      DO_NOT_TRACK_STRING
    )
  })

  it(`listens to respectDNT deprecated option`, () => {
    const mocks = {
      setHeadComponents: jest.fn(),
      setPostBodyComponents: jest.fn(),
    }
    const pluginOptions = {
      trackingIds: [`GA_TRACKING_ID`],
      respectDNT: true,
      pluginConfig: {},
    }

    onRenderBody(mocks, pluginOptions)
    const [, config] = mocks.setPostBodyComponents.mock.calls[0][0]

    expect(config.props.dangerouslySetInnerHTML.__html).toContain(
      DO_NOT_TRACK_STRING
    )
  })
})
