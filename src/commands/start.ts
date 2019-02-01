import { Command } from '@oclif/command'
import override from 'dahlia-webpack-override'
import styledJsx from 'dahlia-webpack-styled-jsx'
import styleComponents from 'dahlia-webpack-styled-components'

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
    const dahliaConfig = require(dahliaConfigPath)
    const webpackConfig = require(webpackConfigPath)
    const devServerConfig = require(devServerConfigPath)
    const devServer =
      dahliaConfig.devServer ||
      ((configFunction: any) => (proxy: any, allowedHost: any) =>
        configFunction(proxy, allowedHost))

    require.cache[require.resolve(webpackConfigPath)].exports = (env: string) => {
      const config = webpackConfig(env)
      const newConfig = override(config, env).pipe(
        styleComponents(),
        styledJsx(),
      )

      return dahliaConfig.webpack(newConfig, env)
    }

    require.cache[require.resolve(devServerConfigPath)].exports = devServer(
      devServerConfig,
      process.env.NODE_ENV,
    )

    require(`${reactScriptsModulePath}/scripts/start`)
  }
}
