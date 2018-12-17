import spawn from 'cross-spawn'
import { Command } from '@oclif/command'
import { reactScripts } from '../lib/utils'

export default class New extends Command {
  static description = 'Build project for production'
  static aliases = ['b']
  static examples = [`$ dh build`]

  async run() {
    spawn(reactScripts, ['build'], {
      stdio: 'inherit',
    })
  }
}
