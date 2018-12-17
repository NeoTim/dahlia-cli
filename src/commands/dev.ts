import spawn from 'cross-spawn'
import { Command } from '@oclif/command'
import { reactScripts } from '../lib/utils'

export default class New extends Command {
  static description = 'Run a dev server for development'
  static aliases = ['d']
  static examples = [`$ dh dev`]

  async run() {
    spawn(reactScripts, ['start'], {
      stdio: 'inherit',
    })
  }
}
