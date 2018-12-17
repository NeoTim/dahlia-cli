export const deps = [
  '@types/jest',
  '@types/node',
  '@types/react',
  '@types/react-dom',
  '@types/react-router-dom',
  'dahlia',
  'react@next',
  'react-dom@next',
  'react-router-dom',
  'react-scripts',
  'typescript',
]

export const pkg = {
  version: '0.1.0',
  scripts: {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
    eject: 'react-scripts eject',
  },
  browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
}

// Todo
export const filesToCheck = [
  'package.json',
  'public',
  'src',
  'tsconfig.json',
  'yarn.lock',
]
