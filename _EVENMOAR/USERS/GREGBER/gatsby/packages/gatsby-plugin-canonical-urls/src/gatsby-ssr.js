import React from "react"
import url from "url"

exports.onRenderBody = (
  { setHeadComponents, pathname = `/` },
  pluginOptions
) => {
  if (pluginOptions && pluginOptions.siteUrl) {
    const siteUrl = pluginOptions.siteUrl.replace(/\/$/, ``)
    const parsed = url.parse(`${siteUrl}${pathname}`)
    const stripQueryString =
      typeof pluginOptions.stripQueryString !== `undefined`
        ? pluginOptions.stripQueryString
        : false

    let pageUrl = ``

    if (stripQueryString) {
      pageUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname}`
    } else {
      pageUrl = parsed.href
    }

    setHeadComponents([
      <link
        rel="canonical"
        key={pageUrl}
        href={pageUrl}
        data-baseprotocol={parsed.protocol}
        data-basehost={parsed.host}
      />,
    ])
  }
}
