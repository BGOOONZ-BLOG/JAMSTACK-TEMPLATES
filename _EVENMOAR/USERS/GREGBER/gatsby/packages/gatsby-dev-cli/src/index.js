#!/usr/bin/env node

const Configstore = require(`configstore`)
const pkg = require(`../package.json`)
const _ = require(`lodash`)
const path = require(`path`)
const os = require(`os`)
const watch = require(`./watch`)
const { getVersionInfo } = require(`./utils/version`)
const argv = require(`yargs`)
  .usage(`Usage: gatsby-dev [options]`)
  .alias(`q`, `quiet`)
  .nargs(`q`, 0)
  .describe(`q`, `Do not output copy file information`)
  .alias(`s`, `scan-once`)
  .nargs(`s`, 0)
  .describe(`s`, `Scan once. Do not start file watch`)
  .alias(`p`, `set-path-to-repo`)
  .nargs(`p`, 1)
  .describe(
    `p`,
    `Set path to Gatsby repository.
You typically only need to configure this once.`
  )
  .nargs(`force-install`, 0)
  .describe(
    `force-install`,
    `Disables copying files into node_modules and forces usage of local npm repository.`
  )
  .alias(`C`, `copy-all`)
  .nargs(`C`, 0)
  .describe(
    `C`,
    `Copy all contents in packages/ instead of just gatsby packages`
  )
  .array(`packages`)
  .describe(`packages`, `Explicitly specify packages to copy`)
  .help(`h`)
  .alias(`h`, `help`)
  .nargs(`v`, 0)
  .alias(`v`, `version`)
  .describe(`v`, `Print the currently installed version of Gatsby Dev CLI`).argv

if (argv.version) {
  console.log(getVersionInfo())
  process.exit()
}

const conf = new Configstore(pkg.name)

const fs = require(`fs-extra`)

let pathToRepo = argv.setPathToRepo

if (pathToRepo) {
  if (pathToRepo.includes(`~`)) {
    pathToRepo = path.join(os.homedir(), pathToRepo.split(`~`).pop())
  }
  conf.set(`gatsby-location`, path.resolve(pathToRepo))
  process.exit()
}

const havePackageJsonFile = fs.existsSync(`package.json`)

if (!havePackageJsonFile) {
  console.error(`Current folder must have a package.json file!`)
  process.exit()
}

const gatsbyLocation = conf.get(`gatsby-location`)

if (!gatsbyLocation) {
  console.error(
    `
You haven't set the path yet to your cloned
version of Gatsby. Do so now by running:

gatsby-dev --set-path-to-repo /path/to/my/cloned/version/gatsby
`
  )
  process.exit()
}

// get list of packages from monorepo
const monoRepoPackages = fs.readdirSync(path.join(gatsbyLocation, `packages`))

const localPkg = JSON.parse(fs.readFileSync(`package.json`))
// intersect dependencies with monoRepoPackages to get list of packages that are used
let localPackages = _.intersection(
  monoRepoPackages,
  Object.keys(_.merge({}, localPkg.dependencies, localPkg.devDependencies))
)

if (!argv.packages && _.isEmpty(localPackages)) {
  console.error(
    `
You haven't got any gatsby dependencies into your current package.json

You probably want to pass in a list of packages to start
developing on! For example:

gatsby-dev --packages gatsby gatsby-transformer-remark

If you prefer to place them in your package.json dependencies instead,
gatsby-dev will pick them up.
`
  )
  process.exit()
}

watch(gatsbyLocation, argv.packages, {
  localPackages,
  quiet: argv.quiet,
  scanOnce: argv.scanOnce,
  forceInstall: argv.forceInstall,
  monoRepoPackages,
})
