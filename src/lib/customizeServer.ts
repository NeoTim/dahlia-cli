import fs from 'fs-extra'
import { dahliaConfigPath, devServerConfigPath } from './paths'

export const customizeServer = () => {
  const devServerConfig = require(devServerConfigPath)

  let devServer = (configFunction: any, env?: string) => (proxy: any, allowedHost: any) =>
    configFunction(proxy, allowedHost, env)

  if (fs.existsSync(dahliaConfigPath)) {
    const dahliaConfig = require(dahliaConfigPath)
    if (dahliaConfig.devServer) {
      devServer = dahliaConfig.devServer
    }
  }

  require.cache[require.resolve(devServerConfigPath)].exports = devServer(
    devServerConfig,
    process.env.NODE_ENV,
  )
}
