import { errorMap, defaultError } from "../error-map"

test(`it defaults to generic error`, () => {
  expect(defaultError).toEqual(
    expect.objectContaining({
      level: `ERROR`,
    })
  )

  expect(defaultError.text({})).toEqual(`There was an error`)
})

test(`it supports structured lookups`, () => {
  const error = errorMap[`95312`]

  expect(error).toEqual(
    expect.objectContaining({
      text: expect.any(Function),
      docsUrl: `https://gatsby.dev/debug-html`,
      level: `ERROR`,
    })
  )
})
