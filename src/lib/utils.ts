import path from 'path'
import fs from 'fs'

export const baseDir = path.join(__dirname, '..', '..')

export const projectDir = path.resolve(fs.realpathSync(process.cwd()))

export const dahliaConfigPath = `${projectDir}/dahlia.config.js`

export const tmpDir = `${projectDir}/src/.dahlia`

export const entryPath = `${projectDir}/src/.dahlia/index.tsx`

export const reactScripts = path.join(projectDir, 'node_modules', '.bin', 'react-scripts')

export const reactScriptsModulePath = path.join(projectDir, 'node_modules', 'react-scripts')

export const webpackConfigPath = `${reactScriptsModulePath}/config/webpack.config.js`

export const devServerConfigPath = `${reactScriptsModulePath}/config/webpackDevServer.config.js`
