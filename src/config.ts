export const deps = [
  '@types/jest',
  '@types/react',
  '@types/react-dom',
  'dahlia',
  'dahlia-cli',
  'react',
  'react-dom',
  'typescript',
]

export const pkg = {
  version: '0.1.0',
  scripts: {
    start: 'dh start ',
    build: 'dh build',
    test: 'dh test',
  },
  browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
}

// TODO: check files
export const filesToCheck = [
  'package.json',
  'public',
  'src',
  'tsconfig.json',
  'yarn.lock',
  '.gitignore',
  'README.md',
]

export const entryText = `
import Dahlia, { Config } from 'dahlia'
import routes from './config/routes'

const { NODE_ENV } = process.env

let config: Config = {
  routes,
  root: '#root',
} as Config

if (NODE_ENV === 'development') {
  const { config: devConfig } = require('./config/config.dev')
  config = {
    ...config,
    ...devConfig,
  }
} else {
  const { config: prodConfig } = require('./config/config.prod')
  config = {
    ...config,
    ...prodConfig,
  }
}

Dahlia.bootstrap(config)

`
