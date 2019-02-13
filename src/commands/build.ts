import fs from 'fs'
import { Command } from '@oclif/command'
import override from 'dahlia-webpack-override'
import styledJsx from 'dahlia-webpack-styled-jsx'
import styleComponents from 'dahlia-webpack-styled-components'

import { dahliaConfigPath, reactScriptsModulePath, webpackConfigPath } from '../lib/utils'

export default class New extends Command {
  static description = 'Build project for production'
  static aliases = ['b']
  static examples = [`$ dh build`]

  async run() {
    process.env.NODE_ENV = 'production'
    const webpackConfig = require(webpackConfigPath)

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

    // run original script
    require(`${reactScriptsModulePath}/scripts/build`)
  }
}
