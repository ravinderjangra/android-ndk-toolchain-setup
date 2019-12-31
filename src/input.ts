import * as core from '@actions/core'

export interface NdkToolChainSetupInput {
  api: string
  arch: string
  installLocation: string
  force: boolean
  addToPath: boolean
}

export function get(): NdkToolChainSetupInput {
  const api = getInput('api', {required: true})
  const arch = getInput('arch', {required: true})
  const installLocation = getInput('install-location')
  const force = getInputBool('force')
  const addToPath = getInputBool('add-to-path')

  return {
    api,
    arch,
    installLocation,
    force: force || false,
    addToPath: addToPath || true
  }
}

// Copied from actions-rs/core
export function getInput(name: string, options?: core.InputOptions): string {
  const inputFullName = name.replace(/-/g, '_')
  const value = core.getInput(inputFullName, options)
  if (value.length > 0) {
    return value
  }

  return core.getInput(name, options)
}

export function getInputBool(
  name: string,
  options?: core.InputOptions
): boolean {
  const value = getInput(name, options)
  if (value && (value === 'true' || value === '1')) {
    return true
  } else {
    return false
  }
}
