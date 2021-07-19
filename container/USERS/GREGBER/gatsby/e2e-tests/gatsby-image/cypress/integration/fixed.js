const fixedTestId = `image-fixed`

describe(`fixed`, () => {
  beforeEach(() => {
    cy.visit(`/fixed`).waitForRouteChange()
  })

  it(`does not render a spacer div`, () => {
    cy.getTestElement(fixedTestId)
      .find(`.gatsby-image-wrapper > div`)
      .should(`not.exist`)
  })

  it(`applies height and width to wrapper`, () => {
    cy.getTestElement(fixedTestId)
      .find(`.gatsby-image-wrapper`)
      .should(`have.attr`, `style`)
      .and(style => {
        ;[`height:`, `width:`].forEach(part => {
          expect(style).contains(part)
        })
      })
  })

  it(`applies 1x/2x`, () => {
    cy.getTestElement(fixedTestId)
      .find(`picture > source`)
      .should(`have.attr`, `srcset`)
      .and(srcset => {
        ;[`1x`, `2x`].forEach(size => {
          expect(srcset).contains(size)
        })
      })
  })

  it(`does not apply 3x`, () => {
    cy.getTestElement(fixedTestId)
      .find(`picture > source`)
      .should(`have.attr`, `srcset`)
      .and(srcset => {
        expect(srcset).not.contains(`3x`)
      })
  })

  describe(`picture > img sizing`, () => {
    it(`applies height attribute`, () => {
      cy.getTestElement(fixedTestId)
        .find(`picture > img`)
        .should(`have.attr`, `height`)
        .and(`match`, /^\d+$/)
    })

    it(`applies width attribute`, () => {
      cy.getTestElement(fixedTestId)
        .find(`picture > img`)
        .should(`have.attr`, `width`)
        .and(`match`, /^\d+$/)
    })
  })
})
