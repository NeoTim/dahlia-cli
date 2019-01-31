import { Command } from '@oclif/command'
import {
  dahliaConfigPath,
  reactScriptsModulePath,
  webpackConfigPath,
  devServerConfigPath,
} from '../lib/utils'

export default class New extends Command {
  static description = 'Run a dev server for development'
  static aliases = ['d']
  static examples = [`$ dh start`]

  async run() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'
    const overrides = require(dahliaConfigPath)
    const webpackConfig = require(webpackConfigPath)
    const devServerConfig = require(devServerConfigPath)
    const devServer =
      overrides.devServer ||
      ((configFunction: any) => (proxy: any, allowedHost: any) =>
        configFunction(proxy, allowedHost))

    require.cache[require.resolve(webpackConfigPath)].exports = (env: string) =>
      overrides.webpack(webpackConfig(env), env)

    require.cache[require.resolve(devServerConfigPath)].exports = devServer(
      devServerConfig,
      process.env.NODE_ENV,
    )

    require(`${reactScriptsModulePath}/scripts/start`)
  }
}
