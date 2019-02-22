import chalk from 'chalk'
import download from 'download-git-repo'

const DAHLIA_TEMPLATE = 'forsigner/dahlia-template'

export async function createApp(root: string) {
  return new Promise((resolve, reject) => {
    download(DAHLIA_TEMPLATE, root, (err: any) => {
      if (err) return reject(err)
      resolve()
      console.log(`Creating a new Dahlia app in ${chalk.green(root)}.`)
      console.log()
      console.log('Installing packages. This might take a couple of minutes.')
      console.log(
        `Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan(
          'dahlia',
        )}...`,
      )
      console.log()
    })
  })
}
