import fs from 'fs-extra'
import override from 'dahlia-webpack-override'
import styledJsx from 'dahlia-webpack-styled-jsx'
import styleComponents from 'dahlia-webpack-styled-components'

import { dahliaConfigPath, entryPath, webpackConfigPath } from './paths'

export const customizeWebpack = () => {
  const webpackConfig = require(webpackConfigPath)

  require.cache[require.resolve(webpackConfigPath)].exports = (env: string) => {
    const config = webpackConfig(env)

    // TODO: update entry
    config.entry[1] = entryPath

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
}
