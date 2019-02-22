import { execSync } from 'child_process'

export function canUseYarn() {
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
