const os = require('os')
const path = require('path')
const execa = require('execa')
const fs = require('fs-extra')
const prettyBytes = require('pretty-bytes')
const gzipSize = require('next/dist/compiled/gzip-size')
const { nodeFileTrace } = require('next/dist/compiled/@vercel/nft')
const { linkPackages } =
  require('../.github/actions/next-stats-action/src/prepare/repo-setup')()

const MAX_COMPRESSED_SIZE = 250 * 1000
const MAX_UNCOMPRESSED_SIZE = 2.5 * 1000 * 1000

// install next outside the monorepo for clean `node_modules`
// to trace against which helps ensure minimal trace is
// produced.
// react and react-dom need to be traced specific to installed
// version so isn't pre-traced
async function main() {
  const tmpdir = os.tmpdir()
  const origRepoDir = path.join(__dirname, '..')
  const repoDir = path.join(tmpdir, `tmp-next-${Date.now()}`)
  const workDir = path.join(tmpdir, `trace-next-${Date.now()}`)

  await fs.copy(origRepoDir, repoDir, {
    filter: (item) => {
      return !item.includes('node_modules')
    },
  })

  console.log('using workdir', workDir)
  console.log('using repodir', repoDir)
  await fs.ensureDir(workDir)

  const pkgPaths = await linkPackages(repoDir)

  await fs.writeFile(
    path.join(workDir, 'package.json'),
    JSON.stringify(
      {
        dependencies: {
          next: pkgPaths.get('next'),
        },
        private: true,
      },
      null,
      2
    )
  )
  await execa('yarn', ['install'], {
    cwd: workDir,
    stdio: ['ignore', 'inherit', 'inherit'],
    env: {
      ...process.env,
      YARN_CACHE_FOLDER: path.join(workDir, '.yarn-cache'),
    },
  })

  const nextServerPath = path.join(
    workDir,
    'node_modules/next/dist/server/next-server.js'
  )

  const traceLabel = `traced ${nextServerPath}`
  console.time(traceLabel)

  const result = await nodeFileTrace([nextServerPath], {
    base: workDir,
    processCwd: workDir,
    ignore: [
      'node_modules/next/dist/pages/**/*',
      'node_modules/next/dist/server/image-optimizer.js',
      'node_modules/next/dist/compiled/@ampproject/toolbox-optimizer/**/*',
      'node_modules/next/dist/server/lib/squoosh/**/*.wasm',
      'node_modules/next/dist/compiled/webpack/(bundle4|bundle5).js',
      'node_modules/react/**/*.development.js',
      'node_modules/react-dom/**/*.development.js',
      'node_modules/use-subscription/**/*.development.js',
      'node_modules/sharp/**/*',
    ],
  })

  const tracedDeps = new Set()
  let totalCompressedSize = 0
  let totalUncompressedSize = 0

  for (const file of result.fileList) {
    if (result.reasons[file].type === 'initial') {
      continue
    }
    tracedDeps.add(file)
    const stat = await fs.stat(path.join(workDir, file))

    if (stat.isFile()) {
      const compressedSize = await gzipSize(path.join(workDir, file))
      totalUncompressedSize += stat.size || 0
      totalCompressedSize += compressedSize
    } else {
      console.log('not a file', file, stat.isDirectory())
    }
  }

  console.log({
    numberFiles: tracedDeps.size,
    totalGzipSize: prettyBytes(totalCompressedSize),
    totalUncompressedSize: prettyBytes(totalUncompressedSize),
  })

  await fs.writeFile(
    path.join(
      __dirname,
      '../packages/next/dist/server/next-server.js.nft.json'
    ),
    JSON.stringify({
      files: Array.from(tracedDeps),
      version: 1,
    })
  )
  await fs.remove(workDir)
  await fs.remove(repoDir)

  console.timeEnd(traceLabel)

  if (
    totalCompressedSize > MAX_COMPRESSED_SIZE ||
    totalUncompressedSize > MAX_UNCOMPRESSED_SIZE
  ) {
    throw new Error(
      `Max traced size of next-server exceeded limits of ${MAX_COMPRESSED_SIZE} compressed or ${MAX_UNCOMPRESSED_SIZE} uncompressed`
    )
  }
}

main()
  .then(() => console.log('done'))
  .catch(console.error)
