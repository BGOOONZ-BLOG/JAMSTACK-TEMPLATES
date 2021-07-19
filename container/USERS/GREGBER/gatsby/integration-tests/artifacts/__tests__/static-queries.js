const { spawn } = require(`child_process`)
const path = require(`path`)
const { murmurhash } = require(`babel-plugin-remove-graphql-queries`)
const { readPageData } = require(`gatsby/dist/utils/page-data`)
const { stripIgnoredCharacters } = require(`gatsby/graphql`)

jest.setTimeout(100000)

const publicDir = path.join(process.cwd(), `public`)

const gatsbyBin = path.join(`node_modules`, `.bin`, `gatsby`)

const titleQuery = `
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const authorQuery = `
  {
    site {
      siteMetadata {
        author
      }
    }
  }
`

const githubQuery = `
  {
    site {
      siteMetadata {
        github
      }
    }
  }
`

const moreInfoQuery = `
  {
    site {
      siteMetadata {
        moreInfo
      }
    }
  }
`

function hashQuery(query) {
  const text = stripIgnoredCharacters(query)
  const hash = murmurhash(text, `abc`)
  return String(hash)
}

const globalQueries = [githubQuery, moreInfoQuery]

describe(`Static Queries`, () => {
  beforeAll(async done => {
    const gatsbyProcess = spawn(gatsbyBin, [`build`], {
      stdio: [`inherit`, `inherit`, `inherit`, `inherit`],
      env: {
        ...process.env,
        NODE_ENV: `production`,
      },
    })

    gatsbyProcess.on(`exit`, exitCode => {
      done()
    })
  })

  test(`are written correctly when inline`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/inline/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly when imported`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/import/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly when dynamically imported`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/dynamic/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly in jsx`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/jsx/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly in tsx`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/tsx/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly in typescript`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/typescript/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly when nesting imports`, async () => {
    const queries = [titleQuery, authorQuery, ...globalQueries]
    const pagePath = `/import-import/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly when nesting dynamic imports`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/dynamic-dynamic/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly when nesting a dynamic import in a regular import`, async () => {
    const queries = [titleQuery, authorQuery, ...globalQueries]
    const pagePath = `/import-dynamic/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly when nesting a regular import in a dynamic import`, async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/dynamic-import/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test("are written correctly with circular dependency", async () => {
    const queries = [titleQuery, ...globalQueries]
    const pagePath = `/circular-dep/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })

  test(`are written correctly when using gatsby-browser`, async () => {
    const queries = [...globalQueries]
    const pagePath = `/gatsby-browser/`

    const { staticQueryHashes } = await readPageData(publicDir, pagePath)

    expect(staticQueryHashes.sort()).toEqual(queries.map(hashQuery).sort())
  })
})
