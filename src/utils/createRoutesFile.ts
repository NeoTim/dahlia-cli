import fs from 'fs-extra'
import jetpack from 'fs-jetpack'
import prettier from 'prettier'

import { routesPath, pagesDir, tmpConfigDir, tmpRoutesConfigPath } from './paths'

function last(arr: string[]): string {
  return arr[arr.length - 1]
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getPageName(path: string = '') {
  const fileName = last(path.split('/'))
  const pageName = fileName.replace(/\.tsx$/, '').replace(/[\.\-\^\$]/g, '_')
  return capitalizeFirstLetter(pageName)
}

function formatPages(pages: string[]) {
  return pages.map(item => {
    const HOME_PAGE = 'src/pages/index.tsx'
    let routerPath: string
    const pageName = getPageName(item)
    const pageImportPath = item.replace(/^src/, '../..').replace(/\.tsx$/, '')
    if (item === HOME_PAGE) {
      routerPath = '/'
    } else {
      routerPath = item.replace(/src\/pages/, '').replace(/\.tsx$/, '')
    }
    return {
      pageName,
      pageImportPath,
      routerPath,
    }
  })
}

function getRoutesConfig(pages: string[]) {
  const pagesArr = formatPages(pages)
  const importFiles = pagesArr
    .map(item => {
      return `import ${item.pageName} from '${item.pageImportPath}'`
    })
    .join('\n')
  const routesString = pagesArr
    .map(item => {
      return `{
  path: '${item.routerPath}',
  component: ${item.pageName},
},`
    })
    .join('\n')

  return `
${importFiles}

const routes = [
  ${routesString}
]

export default routes;
    `
}

function formatCode(text: string) {
  return prettier.format(text, {
    semi: false,
    tabWidth: 2,
    singleQuote: true,
    parser: 'babel',
    trailingComma: 'all',
  })
}

function writeFile(text: string) {
  fs.writeFileSync(tmpRoutesConfigPath, text, { encoding: 'utf8' })
}

function writeFileFromRoutesFile() {
  const routesConfig = fs.readFileSync(routesPath, { encoding: 'utf8' })
  const text = routesConfig.replace(/\.\.\/pages/g, '../../pages')
  writeFile(text)
}

export const createRoutesFile = () => {
  fs.ensureDirSync(tmpConfigDir)

  if (fs.existsSync(routesPath)) {
    writeFileFromRoutesFile()
    return
  }

  const pages = jetpack.find(pagesDir, { matching: '**/*.tsx' })
  const routesText = getRoutesConfig(pages)
  const code = formatCode(routesText)
  writeFile(code)
}
