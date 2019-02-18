import fs from 'fs'
import { watch } from 'chokidar'
import { configs } from './paths'

export const watchConfig = () => {
  configs.forEach(({ origin, target }) => {
    watch(origin).on('all', eventType => {
      if (['add', 'change'].includes(eventType)) {
        // fs.createReadStream(origin).pipe(fs.createWriteStream(target))
        fs.copyFileSync(origin, target)
      }
    })
  })
}
