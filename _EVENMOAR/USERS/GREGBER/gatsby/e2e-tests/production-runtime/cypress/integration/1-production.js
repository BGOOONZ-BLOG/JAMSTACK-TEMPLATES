/* global Cypress, cy */

// NOTE: This needs to be run before any other integration tests as it
// sets up the service worker in offline mode. Therefore, if you want
// to test an individual integration test, you must run this
// first. E.g. to run `compilation-hash.js` test, run
//
// cypress run -s \
// "cypress/integration/1-production.js,cypress/integration/compilation-hash.js" \
// -b chrome

describe(`Production build tests`, () => {
  it(`should render properly`, () => {
    cy.visit(`/`).waitForRouteChange()
  })

  if (Cypress.env(`TEST_PLUGIN_OFFLINE`)) {
    it(`should activate the service worker`, () => {
      cy.waitForAPI(`onServiceWorkerActive`)
    })
  }

  it(`should navigate back after a reload`, () => {
    cy.getTestElement(`page2`).click()

    cy.waitForRouteChange().location(`pathname`).should(`equal`, `/page-2/`)

    cy.reload().waitForRouteChange().go(`back`)

    cy.waitForRouteChange()
      .getTestElement(`page2`)
      .should(`exist`)
      .location(`pathname`)
      .should(`equal`, `/`)
  })

  it(`should work when visiting a page with direct URL entry or an external link`, () => {
    cy.visit(`/page-2/`)
      .waitForRouteChange()
      .getTestElement(`index-link`)
      .should(`exist`)
      .location(`pathname`)
      .should(`equal`, `/page-2/`)
  })

  describe(`relative links`, () => {
    it(`should navigate to a subdirectory`, () => {
      cy.visit(`/`)
        .waitForRouteChange()
        .getTestElement(`subdir-link`)
        .click()
        .location(`pathname`)
        .should(`eq`, `/subdirectory/page-1`)
    })

    it(`can navigate to a sibling page`, () => {
      cy.visit(`/subdirectory/page-1`)
        .waitForRouteChange()
        .getTestElement(`page-2-link`)
        .click()
        .location(`pathname`)
        .should(`eq`, `/subdirectory/page-2`)
    })

    it(`can navigate to a parent page`, () => {
      cy.visit(`/subdirectory/page-1`)
        .waitForRouteChange()
        .getTestElement(`page-parent-link`)
        .click()
        .location(`pathname`)
        .should(`eq`, `/subdirectory`)
    })

    it(`can navigate to a sibling page programatically`, () => {
      cy.visit(`/subdirectory/page-1`)
        .waitForRouteChange()
        .getTestElement(`page-2-button-link`)
        .click()
        .location(`pathname`)
        .should(`eq`, `/subdirectory/page-2`)
    })
  })

  it(`should show 404 page when clicking a link to a non-existent page route`, () => {
    cy.visit(`/`).waitForRouteChange()

    cy.getTestElement(`404`).click()

    cy.waitForRouteChange()
      .location(`pathname`)
      .should(`equal`, `/page-3/`)
      .getTestElement(`404`)
      .should(`exist`)
  })

  it(`should show 404 page when directly entering an invalid URL`, () => {
    cy.visit(`/non-existent-page/`, {
      failOnStatusCode: false,
    })

    cy.waitForRouteChange().getTestElement(`404`).should(`exist`)
  })

  it(`should navigate back after a 404 from a direct link entry`, () => {
    cy.visit(`/`).waitForRouteChange()

    cy.visit(`/non-existent-page/`, {
      failOnStatusCode: false,
    })

    cy.waitForRouteChange()
      .go(`back`)
      .waitForRouteChange()
      .getTestElement(`index-link`)
      .should(`exist`)
  })

  it(`should pass pathContext to props`, () => {
    cy.visit(`/path-context`).waitForRouteChange()

    // `bar` is set in gatsby-node createPages
    cy.getTestElement(`path-context-foo`).contains(`bar`)
  })

  it(`Uses env vars`, () => {
    cy.visit(`/env-vars`).waitForRouteChange()

    cy.getTestElement(`process.env`).contains(`{}`)
    cy.getTestElement(`process.env.EXISTING_VAR`).contains(`"foo bar"`)
    cy.getTestElement(`process.env.NOT_EXISTING_VAR`).should(`be.empty`)
  })

  it(`should be able to create a page from component located in .cache directory`, () => {
    cy.visit(`/page-from-cache/`).waitForRouteChange()

    // `bar` is set in gatsby-node createPages
    cy.getTestElement(`dom-marker`).contains(`[static-page-from-cache]`)
  })

  describe(`Supports unicode characters in urls`, () => {
    it(`Can navigate directly`, () => {
      cy.visit(`/안녕/`, {
        // Cypress seems to think it's 404
        // even if it's not. 404 page doesn't have
        // `page-2-message` element so the test will fail on
        // assertion. Using failOnStatusCode here
        // only to workaround cypress weirdness
        failOnStatusCode: false,
      }).waitForRouteChange()

      cy.getTestElement(`page-2-message`)
        .invoke(`text`)
        .should(`equal`, `Hi from the second page`)
    })

    it(`Can navigate on client`, () => {
      cy.visit(`/`).waitForRouteChange()
      cy.getTestElement(`page-with-unicode-path`).click().waitForRouteChange()

      cy.getTestElement(`page-2-message`)
        .invoke(`text`)
        .should(`equal`, `Hi from the second page`)
    })

    it(`should show 404 page when url with unicode characters point to a non-existent page route when navigating directly`, () => {
      cy.visit(`/안녕404/`, {
        failOnStatusCode: false,
      }).waitForRouteChange()

      cy.getTestElement(`404`).should(`exist`)
    })

    it(`should show 404 page when url with unicode characters point to a non-existent page route when navigating on client`, () => {
      cy.visit(`/`).waitForRouteChange()
      cy.window()
        .then(win => win.___navigate(`/안녕404/`))
        .waitForRouteChange()

      cy.getTestElement(`404`).should(`exist`)
    })
  })
})
