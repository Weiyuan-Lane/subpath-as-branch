#!/usr/bin/env node

'use strict'

const logger = require('../src/logger')
const exec = require('../src/exec')
const cli = require('../src/cli')

// Step 0: Check for presence of compulsory arguments
cli.parse(process.argv)
logger.log('0. Checking for required process arguments')

if (!cli.path || (!cli.branch && !cli.clean)) {
  logger.error(`Invalid command: ${cli.args.join(' ')}\nSee --help for a list of available commands.`)
}

// Get the required fields
const targetPath = cli.path
const targetBranch = cli.branch
const forceFlag = cli.force ? '-f' : ''
const needClean = Boolean(cli.clean)

if (!needClean) {
  // Step 1: Check if git is supported by the machine's cli
  logger.log('1. Checking for git binary')
  const gitPresence = exec('which git')
  if (gitPresence.status !== 0) {
    logger.error('git binary is not install. Please install it before using this package')
  }

  // Step 2: Fetch changes from origin
  logger.log('2. Fetch from origin')
  const gitFetchOutput = exec('git fetch -p origin')
  if (gitFetchOutput.status !== 0) {
    logger.error(`git fetch failed for the following reason(s): \n${gitFetchOutput.message}`)
  }


  // Step 3: Get local git config
  logger.log('3. Getting local git config')
  const gitGetRemoteOutput = exec('git remote get-url origin')
  if (gitGetRemoteOutput.status !== 0) {
    logger.error(`git remote failed for the following reason(s): \n${gitGetRemoteOutput.message}`)
  }
  const gitRemoteUrl = gitGetRemoteOutput.message

  // Step 4: Changing context to the directory
  logger.log('4. Building branch subpath context in --path')
  const targetPathOutput = exec(`cd ${targetPath}`)
  if (targetPathOutput.status !== 0) {
    logger.error(`cd failed for the following reason(s): \n${targetPathOutput.message}`)
  }
  const gitInitOutput = exec(`cd ${targetPath} && git init`)
  if (gitInitOutput.status !== 0) {
    logger.error(`git init failed for the following reason(s): \n${gitInitOutput.message}`)
  }
  const gitAddOriginOutput = exec(`cd ${targetPath} && git remote add origin ${gitRemoteUrl}`)
  if (gitAddOriginOutput.status !== 0) {
    logger.error(`git remote failed for the following reason(s): \n${gitAddOriginOutput.message}`)
  }

  // Step 5. Push branch to origin
  logger.log('5. Push branch to origin')
  const gitPushBranchOutput = exec(`cd ${targetPath} && git checkout -b ${targetBranch} && git add --all && git commit -m 'subpath-as-branch publish' && git push ${forceFlag} --set-upstream origin ${targetBranch}`)
  if (gitPushBranchOutput.status !== 0) {
    logger.error(`push branch via git failed for the following reason(s): \n${gitPushBranchOutput.message}`)
  }
}
// Step 6. Cleanup
logger.log(`${needClean ? 1 : 6}. Remove created git repository and return to original path`)
const rmGit = exec(`cd ${targetPath} && rm -rf .git`)
if (rmGit.status !== 0) {
  logger.error(`rm hidden git dir failed for the following reason(s): \n${rmGit.message}`)
}
