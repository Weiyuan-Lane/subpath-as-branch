'use strict'

const program = require('commander')
program
  .version('0.0.7')
  .option('-p, --path <value>', 'Target path to submit')
  .option('-b, --branch <value>', 'Branch name')
  .option('-f, --force', 'Force push')
  .option('-c, --clean', 'Clean git in subpath')

module.exports = program