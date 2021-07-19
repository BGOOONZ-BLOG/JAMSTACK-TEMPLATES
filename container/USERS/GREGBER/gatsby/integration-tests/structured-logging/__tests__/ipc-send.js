const { spawn } = require(`child_process`)
const path = require(`path`)

jest.setTimeout(20000) // 20s

const gatsbyBin = path.join(
  `node_modules`,
  `gatsby`,
  `dist`,
  `bin`,
  `gatsby.js`
)

describe(`IPC Send`, () => {
  let gatsbyProcess

  beforeAll(() => {
    gatsbyProcess = spawn("node", [gatsbyBin, `develop`], {
      stdio: [`ignore`, `ignore`, `ignore`, `ipc`],
      env: {
        ...process.env,
        NODE_ENV: `development`,
      },
    })
  })

  afterAll(async () => {
    gatsbyProcess.kill()
  })

  // TODO remove to a more global integration test but for now we want to make sure it gets an external send command
  it(`should kill the develop process when exit command is given`, done => {
    expect.assertions(1)
    gatsbyProcess.on("exit", () => {
      expect(true).toBe(true)
      done()
    })

    let hasSentExitCode
    gatsbyProcess.on("message", msg => {
      if (hasSentExitCode) {
        return
      }

      hasSentExitCode = true

      gatsbyProcess.send({
        type: "COMMAND",
        action: {
          type: "EXIT",
          payload: "SIGINT",
        },
      })
    })
  })
})
