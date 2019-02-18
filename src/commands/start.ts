import { Command } from '@oclif/command'

import { reactScriptsModulePath } from '../lib/paths'
import { createEntryFile } from '../lib/createEntryFile'
import { createRoutesFile } from '../lib/createRoutesFile'
import { watchConfig } from '../lib/watchConfig'
import { watchPages } from '../lib/watchPages'
import { disableCheckRequiredFilesPath } from '../lib/disableCheckRequiredFilesPath'
import { disableClearConsole } from '../lib/disableClearConsole'
import { customizeWebpack } from '../lib/customizeWebpack'
import { customizeServer } from '../lib/customizeServer'

export default class Start extends Command {
  static description = 'Run a dev server for development'
  static aliases = ['s']
  static examples = [`$ dh start`]

  async run() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'

    createEntryFile()
    createRoutesFile()
    watchConfig()
    watchPages()
    customizeWebpack()
    customizeServer()
    disableCheckRequiredFilesPath()
    disableClearConsole()

    require(`${reactScriptsModulePath}/scripts/start`)
  }
}
