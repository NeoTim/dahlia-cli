import fs from 'fs-extra'
import { entryText } from '../config'
import { tmpDir, entryPath } from './paths'

function createTmpDir(dir: string) {
  fs.ensureDirSync(dir)
}

export const createEntryFile = () => {
  createTmpDir(tmpDir)
  fs.writeFileSync(entryPath, entryText, { encoding: 'utf8' })
}
