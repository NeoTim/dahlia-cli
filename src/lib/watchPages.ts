import fs from 'fs'
import { watch } from 'chokidar'

import { pageFiles } from './paths'
import { createRoutesFile } from './createRoutesFile'

export const watchPages = () => {
  watch(pageFiles, {
    ignoreInitial: true,
  }).on('all', eventType => {
    if (['add', 'unlink', 'unlinkDir'].includes(eventType)) {
      createRoutesFile()
    }
  })
}
