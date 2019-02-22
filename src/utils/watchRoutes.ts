import { watch } from 'chokidar'
import { routesPath } from './paths'
import { createRoutesFile } from './createRoutesFile'

export const watchRoutes = () => {
  watch(routesPath, {
    ignoreInitial: true,
  }).on('all', eventType => {
    if (['add', 'change', 'unlink'].includes(eventType)) {
      createRoutesFile()
    }
  })
}
