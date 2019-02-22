import { Command } from '@oclif/command'

import { reactScriptsModulePath } from '../utils/paths'
import { createEntryFile } from '../utils/createEntryFile'
import { createConfigFile } from '../utils/createConfigFile'
import { createRoutesFile } from '../utils/createRoutesFile'
import { watchConfig } from '../utils/watchConfig'
import { watchPages } from '../utils/watchPages'
import { disableCheckRequiredFilesPath } from '../utils/disableCheckRequiredFilesPath'
import { disableClearConsole } from '../utils/disableClearConsole'
import { customizeWebpack } from '../utils/customizeWebpack'
import { customizeServer } from '../utils/customizeServer'

export default class Start extends Command {
  static description = 'Run a dev server for development'
  static aliases = ['s']
  static examples = [`$ dh start`]

  async run() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'

    createEntryFile()
    createConfigFile()
    createRoutesFile()
    watchConfig()
    watchPages()
    customizeWebpack('development')
    customizeServer()
    disableCheckRequiredFilesPath()
    disableClearConsole()

    require(`${reactScriptsModulePath}/scripts/start`)
  }
}
