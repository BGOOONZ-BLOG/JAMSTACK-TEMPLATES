const IDS = {
  title: `title`,
  subTitle: `sub-title`,
}

describe(`hot-reloading anonymous arrow functions`, () => {
  beforeEach(() => {
    cy.visit(`/arrows`).waitForRouteChange()
  })
  it(`displays placeholders on launch`, () => {
    cy.getTestElement(IDS.title).invoke(`text`).should(`contain`, `%TITLE%`)

    cy.getTestElement(IDS.subTitle)
      .invoke(`text`)
      .should(`contain`, `%SUB_TITLE%`)
  })

  it(`updates on change`, () => {
    const text = `The title`
    cy.exec(
      `npm run update -- --file src/components/title.tsx --replacements "TITLE:${text}"`
    )

    cy.getTestElement(IDS.title).invoke(`text`).should(`eq`, text)
  })
})
