import path from 'path'
import fs from 'fs-extra'

import { pkg } from '../config'

export function createPkgFile(root: string, appName: string) {
  const pkgPath = path.join(root, 'package.json')
  fs.writeJsonSync(pkgPath, { name: appName, ...pkg }, { spaces: 2 })
}
