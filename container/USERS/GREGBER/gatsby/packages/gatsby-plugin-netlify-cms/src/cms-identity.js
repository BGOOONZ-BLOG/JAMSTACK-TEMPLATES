/* global __PATH_PREFIX__ CMS_PUBLIC_PATH */
import netlifyIdentityWidget from "netlify-identity-widget"

window.netlifyIdentity = netlifyIdentityWidget

const addLoginListener = () =>
  netlifyIdentityWidget.on(`login`, () => {
    document.location.href = `${__PATH_PREFIX__}/${CMS_PUBLIC_PATH}/`
  })

netlifyIdentityWidget.on(`init`, user => {
  if (!user) {
    addLoginListener()
  } else {
    netlifyIdentityWidget.on(`logout`, () => {
      addLoginListener()
    })
  }
})

// Boot on next tick to prevent clashes with css injected into NetlifyCMS
// preview pane.
setImmediate(() => {
  netlifyIdentityWidget.init()
})
