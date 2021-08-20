import { isCI } from "gatsby-core-utils"

// Some CI pipelines incorrectly report process.stdout.isTTY status,
// which causes unwanted lines in the output. An additional check for isCI helps.
// @see https://github.com/prettier/prettier/blob/36aeb4ce4f620023c8174e826d7208c0c64f1a0b/src/utils/is-tty.js
export const isTTY = (): boolean => process.stdout.isTTY && !isCI()
