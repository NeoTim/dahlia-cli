import spawn from 'cross-spawn'

import { canUseYarn } from './canUseYarn'
import { deps } from '../config'

function getInstallArgs(root: string) {
  const useYarn = canUseYarn()
  const installCommand = useYarn ? 'add' : 'install'
  const args = [installCommand, '--save']

  if (useYarn) {
    args.push('--cwd')
    args.push(root)
  }
  return args.concat(deps.sort())
}

export function install(root: string) {
  const command = canUseYarn() ? 'yarn' : 'npm'
  const args = getInstallArgs(root)
  const child = spawn(command, args, {
    stdio: 'inherit',
  })

  return new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
  })
}
