import { Command } from '@oclif/command'

import { dahliaConfigPath, reactScriptsModulePath, webpackConfigPath } from '../lib/utils'

export default class New extends Command {
  static description = 'Build project for production'
  static aliases = ['b']
  static examples = [`$ dh build`]

  async run() {
    process.env.NODE_ENV = 'production'
    const overrides = require(dahliaConfigPath)
    const webpackConfig = require(webpackConfigPath)

    // override config in memory
    require.cache[require.resolve(webpackConfigPath)].exports = (env: string) =>
      overrides.webpack(webpackConfig(env), env)

    // run original script
    require(`${reactScriptsModulePath}/scripts/build`)
  }
}
