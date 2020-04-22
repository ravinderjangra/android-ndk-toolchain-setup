import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as os from 'os'

export class Ndk {
  private osPlatform = os.platform()

  private static defaultNdkPath: string = ""

  private readonly path: string

  private constructor(path: string) {
    this.path = path

    Ndk.defaultNdkPath = '/Users/runner/Library/Android/sdk/ndk-bundle/build/tools/make_standalone_toolchain.py'
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  public static async get(): Promise<Ndk> {
    try {
      return new Ndk(Ndk.defaultNdkPath)
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
