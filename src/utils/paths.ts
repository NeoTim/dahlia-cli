import path from 'path'
import fs from 'fs'

export const baseDir = path.join(__dirname, '..', '..')

export const projectDir = path.resolve(fs.realpathSync(process.cwd()))

export const dahliaConfigPath = `${projectDir}/dahlia.config.js`

export const srcDir = `${projectDir}/src`

export const tmpDir = `${srcDir}/.dahlia`
export const tmpConfigDir = `${srcDir}/.dahlia/config`

export const pagesDir = `${srcDir}/pages`

export const pageFiles = `${srcDir}/pages/**/*.{ts,tsx}`

export const configs = [
  {
    origin: `${srcDir}/config/config.dev.ts`,
    target: `${srcDir}/.dahlia/config/config.dev.ts`,
  },
  {
    origin: `${srcDir}/config/config.prod.ts`,
    target: `${srcDir}/.dahlia/config/config.prod.ts`,
  },
]

// console.log(__dirname)

export const routesPath = `${srcDir}/config/routes.ts`

export const tmpRoutesPath = `${srcDir}/.dahlia/config/routes.ts`

export const devConfigPath = `${projectDir}/src/config/config.dev.ts`

export const tmpDevConfigPath = `${projectDir}/src/.dahlia/config/config.dev.ts`

export const tmpProdConfigPath = `${projectDir}/src/.dahlia/config/config.prod.ts`

export const tmpRoutesConfigPath = `${projectDir}/src/.dahlia/config/routes.ts`

export const entryPath = `${projectDir}/src/.dahlia/index.ts`

// TODO:
// export const reactScripts = path.join(projectDir, 'node_modules', '.bin', 'react-scripts')
export const reactScripts = path.join(baseDir, 'node_modules', '.bin', 'react-scripts')

// TODO:
// export const reactScriptsModulePath = path.join(projectDir, 'node_modules', 'react-scripts')
export const reactScriptsModulePath = path.join(baseDir, 'node_modules', 'react-scripts')

export const webpackConfigPath = `${reactScriptsModulePath}/config/webpack.config.js`

export const devServerConfigPath = `${reactScriptsModulePath}/config/webpackDevServer.config.js`
