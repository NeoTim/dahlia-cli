import { Command } from '@oclif/command'
import { execSync } from 'child_process'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import spawn from 'cross-spawn'
import download from 'download-git-repo'

import { deps, filesToCheck, pkg } from '../config'
import { baseDir } from '../lib/utils'

const DAHLIA_TEMPLATE = 'forsigner/dahlia-template'

export default class New extends Command {
  static description = 'Create a new Dahlia app'
  static aliases = ['n']
  static examples = [`$ dh new my-app`]

  static args = [{ name: 'appName' }]

  async run() {
    const { args } = this.parse(New)

    const appName: string = args.appName
    const templateDir = path.join(baseDir, 'template')
    const root = path.resolve(appName)
    try {
      createAppDir(root)
      await checkAppDir(root, appName)
      await createApp(root, templateDir)
      createPkgFile(root, appName)
      await install(root)
      showTips(root, appName)
    } catch (error) {
      this.log(error)
    }
  }
}

function canUseYarn() {
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

function getConflictMsg(projectName: string, existFiles: string[]) {
  const filesStr = existFiles.map(i => `  ${i}`).join('\n')
  return `
The directory ${chalk.green(projectName)} contains files that could conflict:

${chalk.red(filesStr)}

Either try using a new directory name, or remove the files listed above.
  `
}

function log(...args: any[]) {
  console.log(...args)
}

function createAppDir(root: string) {
  fs.ensureDirSync(root)
}

async function checkAppDir(root: string, appName: string) {
  const projectDirFiles = fs.readdirSync(root)
  const conflictFiles = projectDirFiles.reduce(
    (result: string[], cur) => (filesToCheck.includes(cur) ? [...result, cur] : result),
    [],
  )

  // new project fail due to conflict
  if (conflictFiles.length) {
    const conflictMsg = getConflictMsg(appName, conflictFiles)
    throw conflictMsg
  }
}

async function createApp(root: string, templateDir: string) {
  log(`Creating a new Dahlia app in ${chalk.green(root)}.`)
  log()
  console.log('Installing packages. This might take a couple of minutes.')
  console.log(
    `Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan('dahlia')}...`,
  )
  console.log()

  return new Promise((resolve, reject) => {
    download(DAHLIA_TEMPLATE, root, (err: any) => {
      err ? reject(err) : resolve()
    })
  })
}

function createPkgFile(root: string, appName: string) {
  const pkgPath = path.join(root, 'package.json')
  fs.writeJsonSync(pkgPath, { name: appName, ...pkg }, { spaces: 2 })
}

function getInstallArgs(root: string) {
  const useYarn = canUseYarn()
  const installCommand = useYarn ? 'add' : 'install'
  const args = [installCommand, '--save']

  if (useYarn) {
    args.push('--cwd')
    args.push(root)
  }
  return args.concat(deps.sort())
}

function install(root: string) {
  const command = canUseYarn() ? 'yarn' : 'npm'
  const args = getInstallArgs(root)
  const child = spawn(command, args, {
    stdio: 'inherit',
  })

  return new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
  })
}
// --verbose
function showTips(root: string, appName: string) {
  const useYarn = canUseYarn()

  // Change displayed command to yarn instead of yarnpkg
  const displayedCommand = useYarn ? 'yarn' : 'npm'

  console.log()
  console.log(`Success! Created ${appName} at ${root}`)
  console.log('Inside that directory, you can run several commands:')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} start`))
  console.log('    Starts the development server.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`))
  console.log('    Bundles the app into static files for production.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} test`))
  console.log('    Starts the test runner.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`))
  console.log('    Removes this tool and copies build dependencies, configuration files')
  console.log('    and scripts into the app directory. If you do this, you can’t go back!')
  console.log()
  console.log('We suggest that you begin by typing:')
  console.log()
  console.log(chalk.cyan('  cd'), appName)
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`)
  console.log()
  console.log('Happy hacking!')
}
