import fs from 'fs'
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
    const webpackConfig = require(webpackConfigPath)
    const devServerConfig = require(devServerConfigPath)

    let devServer = (configFunction: any, env?: string) => (proxy: any, allowedHost: any) =>
      configFunction(proxy, allowedHost, env)

    if (fs.existsSync(dahliaConfigPath)) {
      const dahliaConfig = require(dahliaConfigPath)
      if (dahliaConfig.devServer) {
        devServer = dahliaConfig.devServer
      }
    }

    require.cache[require.resolve(webpackConfigPath)].exports = (env: string) => {
      const config = webpackConfig(env)
      const newConfig = override(config, env).pipe(
        styleComponents(),
        styledJsx(),
      )

      if (fs.existsSync(dahliaConfigPath)) {
        const dahliaConfig = require(dahliaConfigPath)
        if (dahliaConfig.webpack) {
          return dahliaConfig.webpack(newConfig, env)
        }
        return newConfig
      }
      return newConfig
    }

    require.cache[require.resolve(devServerConfigPath)].exports = devServer(
      devServerConfig,
      process.env.NODE_ENV,
    )

    require(`${reactScriptsModulePath}/scripts/start`)
  }
}
