export const deps = [
  '@types/jest',
  '@types/react',
  '@types/react-dom',
  'dahlia',
  'react@next',
  'react-dom@next',
  'typescript',
]

export const pkg = {
  version: '0.1.0',
  scripts: {
    dev: 'dh dev ',
    build: 'dh build',
    test: 'dh test',
    eject: 'dh eject',
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
