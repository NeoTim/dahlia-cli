import { Command, flags } from '@oclif/command'

export default class Generate extends Command {
  static description = 'Generate page/component/store...'
  static aliases = ['g']
  static examples = [
    `$ dh generate page Home`,
    `$ dh generate component Header`,
    `$ dh generate store todoStore`,
  ]

  static args = [{ name: 'type' }, { name: 'name' }]

  async run() {
    const { args } = this.parse(Generate)

    // const name = flags.name || 'world'

    this.log('generating ...')
    this.log('args:', args)
  }
}
