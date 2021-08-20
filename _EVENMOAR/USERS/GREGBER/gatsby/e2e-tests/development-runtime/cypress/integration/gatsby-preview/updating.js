beforeEach(() => {
  cy.exec(`npm run reset:preview`)
  cy.visit(`/preview`).waitForRouteChange()
})

after(() => reset())

const update = (times = 1) =>
  new Array(times)
    .fill(undefined)
    .reduce((chain, _) => chain.exec(`npm run update:preview`), cy)
const reset = () => cy.exec(`npm run reset:preview`)

describe(`Gatsby Preview (Updating)`, () => {
  it(`displays initial data`, () => {
    cy.get(`li:eq(0) a`).click().waitForRouteChange()

    cy.findByText(`Hello World (1)`).should(`exist`)

    cy.findByText(`0`).should(`exist`)
  })

  it(`updates and hot-reloads changes to content`, () => {
    cy.get(`li:eq(0) a`).click().waitForRouteChange()

    update()

    cy.findByText(`1`).should(`exist`)
  })

  it(`updates and hot-reloads new content`, () => {
    const count = 5
    update(count)

    cy.get(`li`)
      .its(`length`)
      .should(`be`, count + 1)
  })

  it(`updates when content is deleted`, () => {
    update(5)

    reset()

    cy.get(`li`).its(`length`).should(`be`, 1)
  })

  it(`can be triggered with webhook data`, () => {
    cy.exec(`npm run update:webhook`)

    cy.findByText(`Hello World from a Webhook (999)`).should(`exist`)
  })
})
