import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as os from 'os'

export class Ndk {
  osPlatform = os.platform()
  private path: string = 'default'

  private constructor() {
    const isOSX: boolean = this.osPlatform === 'darwin'
    const isLinux: boolean = this.osPlatform === 'linux'
    if (isLinux) {
      this.path =
        '/usr/local/lib/android/sdk/ndk-bundle/build/tools/make_standalone_toolchain.py'
    } else if (isOSX) {
      this.path =
        '/Users/runner/Library/Android/sdk/ndk-bundle/build/tools/make_standalone_toolchain.py'
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  public static async get(): Promise<Ndk> {
    try {
      return new Ndk()
    } catch (error) {
      core.error('Android NDK in not installed by default.')
      throw error
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  public async call(args: string[], options?: {}): Promise<number> {
    return await exec.exec(this.path, args, options)
  }
}
