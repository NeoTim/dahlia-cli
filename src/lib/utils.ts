import path from 'path'
import fs from 'fs'

export const baseDir = path.join(__dirname, '..', '..')

export const projectDir = path.resolve(fs.realpathSync(process.cwd()))

export const dahliaConfigPath = `${projectDir}/dahlia.config.js`

export const reactScripts = path.join(baseDir, 'node_modules', '.bin', 'react-scripts')

export const reactScriptsModulePath = path.join(baseDir, 'node_modules', 'react-scripts')

export const webpackConfigPath = `${reactScriptsModulePath}/config/webpack.config.js`

export const devServerConfigPath = `${reactScriptsModulePath}/config/webpackDevServer.config.js`
