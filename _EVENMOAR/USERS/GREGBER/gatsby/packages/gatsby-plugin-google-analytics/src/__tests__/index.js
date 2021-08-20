import React from "react"
import { cleanup, fireEvent, render } from "@testing-library/react"
import { trackCustomEvent, OutboundLink } from "../"

describe(`index.js`, () => {
  describe(`<OutboundLink />`, () => {
    afterEach(cleanup)

    const setup = props => {
      const utils = render(<OutboundLink {...props}>link</OutboundLink>)

      return Object.assign({}, utils, {
        link: utils.getByText(`link`),
      })
    }

    it(`matches basic snapshot`, () => {
      const { container } = setup()

      expect(container).toMatchSnapshot()
    })

    it(`matches snapshot with href set`, () => {
      const props = {
        href: `https://www.google.com`,
      }

      const { container } = setup(props)

      expect(container).toMatchSnapshot()
    })

    it(`matches snapshot with additional props set`, () => {
      const props = {
        href: `https://www.google.com`,
        target: `_blank`,
        className: `link-class`,
        rel: `noopener noreferrer`,
      }

      const { container } = setup(props)

      expect(container).toMatchSnapshot()
    })

    it(`sends tracking event when clicked`, () => {
      window.ga = jest.fn()

      const { link } = setup()

      fireEvent.click(link)

      expect(window.ga).toHaveBeenCalled()
    })

    it(`calls custom onClick function`, () => {
      const props = {
        onClick: jest.fn(),
      }

      const { link } = setup(props)

      fireEvent.click(link)

      expect(props.onClick).toHaveBeenCalled()
    })
  })

  describe(`trackCustomEvent()`, () => {
    afterEach(cleanup)

    const setup = props => {
      const utils = render(
        <button
          onClick={e => {
            e.preventDefault()
            trackCustomEvent({
              category: `event`,
              action: `action`,
              label: `label`,
              value: `value`,
            })
          }}
        >
          tapthis
        </button>
      )

      return Object.assign({}, utils, {
        button: utils.getByText(`tapthis`),
      })
    }

    it(`sends tracking event when clicked`, () => {
      window.ga = jest.fn()

      const { button } = setup()

      fireEvent.click(button)

      expect(window.ga).toHaveBeenCalled()
    })
  })
})
