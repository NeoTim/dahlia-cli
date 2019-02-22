import { Command } from '@oclif/command'
import chalk from 'chalk'
import path from 'path'

import { createAppDir } from '../utils/createAppDir'
import { checkAppDir } from '../utils/checkAppDir'
import { createApp } from '../utils/createApp'
import { createPkgFile } from '../utils/createPkgFile'
import { install } from '../utils/install'
import { showTips } from '../utils/showTips'

export default class New extends Command {
  static description = 'Create a new Dahlia app'
  static aliases = ['n']
  static examples = [`$ dh new myapp`]

  static args = [{ name: 'appName' }]

  async run() {
    const { args } = this.parse(New)

    const appName: string = args.appName
    if (!appName) {
      return this.log(chalk.red('required project name, eg: dh new myapp'))
    }

    const root = path.resolve(appName)

    try {
      createAppDir(root)
      checkAppDir(root, appName)
      await createApp(root)
      createPkgFile(root, appName)
      await install(root)
      showTips(root, appName)
    } catch (error) {
      this.log(error)
    }
  }
}
