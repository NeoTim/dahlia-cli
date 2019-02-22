import { Command } from '@oclif/command'

import { reactScriptsModulePath } from '../utils/paths'

import { createEntryFile } from '../utils/createEntryFile'
import { disableCheckRequiredFilesPath } from '../utils/disableCheckRequiredFilesPath'
import { customizeWebpack } from '../utils/customizeWebpack'

export default class Build extends Command {
  static description = 'Build project for production'
  static aliases = ['b']
  static examples = [`$ dh build`]

  async run() {
    process.env.NODE_ENV = 'production'

    createEntryFile()
    customizeWebpack('production')
    disableCheckRequiredFilesPath()

    // run original script
    require(`${reactScriptsModulePath}/scripts/build`)
  }
}
