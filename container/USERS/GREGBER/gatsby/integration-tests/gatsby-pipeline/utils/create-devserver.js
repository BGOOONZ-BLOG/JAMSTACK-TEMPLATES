const execa = require(`execa`)
const path = require(`path`)
const basePath = path.resolve(__dirname, `../`)

const killProcess = devProcess =>
  new Promise(resolve => {
    devProcess.on(`exit`, () => {
      // give it some time to exit
      setTimeout(() => {
        resolve()
      }, 0)
    })

    // If pid is less than -1, then sig is sent to every process in the process group whose ID is -pid.
    // @see https://stackoverflow.com/a/33367711
    process.kill(-devProcess.pid)
  })

module.exports = () =>
  new Promise(resolve => {
    const devProcess = execa(`yarn`, [`develop`], {
      cwd: basePath,
      env: { NODE_ENV: `development` },
      detached: true,
    })

    devProcess.stdout.on(`data`, chunk => {
      if (chunk.toString().includes(`You can now view`)) {
        // We only need to expose a kill function, the rest is not needed
        resolve({ kill: () => killProcess(devProcess) })
      }
    })
  })
