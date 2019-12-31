import * as core from '@actions/core'
import * as exec from '@actions/exec'

export class Ndk {
  private static readonly defaultNdkPath =
    '/usr/local/lib/android/sdk/ndk-bundle'
  private static readonly defaultMakeToolchainFilePath =
    'build/tools/make_standalone_toolchain.py'
  private readonly path: string

  private constructor(path: string) {
    this.path = path
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  public static async get(): Promise<Ndk> {
    try {
      return new Ndk('${Ndk.defaultNdkPath}/${defaultMakeToolchainFilePath}')
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
