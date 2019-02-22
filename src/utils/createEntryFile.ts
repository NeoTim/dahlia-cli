import fs from 'fs-extra'
import { entryText } from '../config'
import { tmpDir, entryPath } from './paths'

export const createEntryFile = () => {
  fs.ensureDirSync(tmpDir)
  fs.writeFileSync(entryPath, entryText, { encoding: 'utf8' })
}
