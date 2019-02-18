import fs from 'fs-extra'
import { Command } from '@oclif/command'
import override from 'dahlia-webpack-override'
import styledJsx from 'dahlia-webpack-styled-jsx'
import styleComponents from 'dahlia-webpack-styled-components'

import {
  dahliaConfigPath,
  tmpDir,
  entryPath,
  reactScriptsModulePath,
  webpackConfigPath,
} from '../lib/paths'

import { entryText } from '../config'

function createTmpDir(dir: string) {
  fs.ensureDirSync(dir)
}

export default class Build extends Command {
  static description = 'Build project for production'
  static aliases = ['b']
  static examples = [`$ dh build`]

  async run() {
    process.env.NODE_ENV = 'production'
    const webpackConfig = require(webpackConfigPath)

    // create entry file
    createTmpDir(tmpDir)
    fs.writeFileSync(entryPath, entryText, { encoding: 'utf8' })

    require.cache[require.resolve(webpackConfigPath)].exports = (env: string) => {
      const config = webpackConfig(env)

      // TODO: update entry
      config.entry[0] = entryPath

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

    // TODO: hack
    // https://github.com/timarney/react-app-rewired/issues/244
    // prevent `react-scripts` from checking for the existence of `public/index.html`
    const checkRequiredFilesPath = 'react-dev-utils/checkRequiredFiles'
    require(checkRequiredFilesPath)
    require.cache[require.resolve(checkRequiredFilesPath)].exports = () => true

    // run original script
    require(`${reactScriptsModulePath}/scripts/build`)
  }
}
