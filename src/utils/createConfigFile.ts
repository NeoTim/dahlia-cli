import fs from 'fs-extra'
import { entryText } from '../config'
import { tmpConfigDir, tmpDevConfigPath, tmpProdConfigPath } from './paths'

const configText = `export const config = {
  rest: {
    endpoint: '/',
  },
  graphql: {
    endpoint: '/',
  },
  root: '#root'
}
`

export const createConfigFile = () => {
  fs.ensureDirSync(tmpConfigDir)
  fs.writeFileSync(tmpDevConfigPath, configText, { encoding: 'utf8' })
  fs.writeFileSync(tmpProdConfigPath, configText, { encoding: 'utf8' })
}
