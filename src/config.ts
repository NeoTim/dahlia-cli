export const deps = [
  '@types/jest',
  '@types/react',
  '@types/react-dom',
  'dahlia',
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

export const entryText = `import Dahlia from 'dahlia'

const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
  // tslint:disable-next-line
  const { config } = require('../config/config.dev')
  Dahlia.bootstrap(config)
} else {
  // tslint:disable-next-line
  const { config } = require('../config/config.prod')
  Dahlia.bootstrap(config)
}
`
