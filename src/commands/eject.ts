import spawn from 'cross-spawn'
import { Command } from '@oclif/command'
import { reactScripts } from '../lib/utils'

export default class New extends Command {
  static description = 'Expose all configurations to customize'
  static aliases = ['e']
  static examples = [`$ dh eject`]

  async run() {
    spawn(reactScripts, ['eject'], {
      stdio: 'inherit',
    })
  }
}
