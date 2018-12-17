import Dahlia from './src'
import { routes } from './routes'

Dahlia.config({
  router: routes,
})

Dahlia.bootstrap('#root')
