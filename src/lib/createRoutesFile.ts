import fs from 'fs-extra'
import jetpack from 'fs-jetpack'

import { pagesDir, tmpRoutesConfigPath } from './paths'

function last(arr: string[]): string {
  return arr[arr.length - 1]
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatPages(pages: string[]) {
  return pages.map(item => {
    const HOME_PAGE = 'src/pages/index.tsx'
    let routerPath: string
    const pageName = capitalizeFirstLetter(last(item.split('/')).replace(/\.tsx$/, ''))
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
      return `
  {
    path: '${item.routerPath}',
    component: ${item.pageName},
  },
        `
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

export const createRoutesFile = () => {
  const pages = jetpack.find(pagesDir, { matching: '**/*.tsx' })
  const routesText = getRoutesConfig(pages)

  fs.writeFileSync(tmpRoutesConfigPath, routesText, { encoding: 'utf8' })
}
