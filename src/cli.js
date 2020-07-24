'use strict'

const program = require('commander')
program
  .version('0.0.7')
  .option('-p, --path <value>', 'target path to submit')
  .option('-b, --branch <value>', 'branch name')
  .option('-f, --force', 'force push')
  .option('-c, --clean', 'clean git in subpath')

module.exports = program