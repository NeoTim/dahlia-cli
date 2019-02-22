import chalk from 'chalk'
import { canUseYarn } from './canUseYarn'

// --verbose
export function showTips(root: string, appName: string) {
  const useYarn = canUseYarn()

  // Change displayed command to yarn instead of yarnpkg
  const displayedCommand = useYarn ? 'yarn' : 'npm'

  console.log()
  console.log(`Success! Created ${appName} at ${root}`)
  console.log('Inside that directory, you can run several commands:')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} start`))
  console.log('    Starts the development server.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`))
  console.log('    Bundles the app into static files for production.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} test`))
  console.log('    Starts the test runner.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`))
  console.log('    Removes this tool and copies build dependencies, configuration files')
  console.log('    and scripts into the app directory. If you do this, you can’t go back!')
  console.log()
  console.log('We suggest that you begin by typing:')
  console.log()
  console.log(chalk.cyan('  cd'), appName)
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`)
  console.log()
  console.log('Happy hacking!')
}
