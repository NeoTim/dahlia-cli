import fs from 'fs-extra'
import path from 'path'
import { Command } from '@oclif/command'
import override from 'dahlia-webpack-override'
import styledJsx from 'dahlia-webpack-styled-jsx'
import styleComponents from 'dahlia-webpack-styled-components'

import {
  dahliaConfigPath,
  entryPath,
  tmpDir,
  reactScriptsModulePath,
  webpackConfigPath,
  devServerConfigPath,
} from '../lib/utils'

import { entryText } from '../config'

function createTmpDir(dir: string) {
  fs.ensureDirSync(dir)
}

export default class Start extends Command {
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

    // create entry file
    createTmpDir(tmpDir)
    fs.writeFileSync(entryPath, entryText, { encoding: 'utf8' })

    require.cache[require.resolve(webpackConfigPath)].exports = (env: string) => {
      const config = webpackConfig(env)

      // TODO: update entry
      config.entry[1] = tmpDir

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

    // TODO: hack
    // https://github.com/timarney/react-app-rewired/issues/244
    // prevent `react-scripts` from checking for the existence of `public/index.html`
    const checkRequiredFilesPath = 'react-dev-utils/checkRequiredFiles'
    require(checkRequiredFilesPath)
    require.cache[require.resolve(checkRequiredFilesPath)].exports = () => true

    require(`${reactScriptsModulePath}/scripts/start`)
  }
}
