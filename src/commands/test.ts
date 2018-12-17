import spawn from 'cross-spawn'
import { Command } from '@oclif/command'
import { reactScripts } from '../lib/utils'

export default class New extends Command {
  static description = 'Runs unit tests in project'
  static aliases = ['t']
  static examples = [`$ dh test`]

  async run() {
    spawn(reactScripts, ['test'], {
      stdio: 'inherit',
    })
  }
}
