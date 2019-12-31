import * as core from '@actions/core';
import * as exec from '@actions/exec';

export class Ndk {
    private static readonly defaultNdkPath = "/usr/local/lib/android/sdk/ndk-bundle";
    private readonly path: string;

    private constructor(path: string) {
        this.path = path;
    }

    public static async get(): Promise<Ndk> {
        try {
            return new Ndk(Ndk.defaultNdkPath);
        }
        catch (error) {
            core.error("Android NDK in not installed by default.");
            throw error;
        }
    }

    public async call(args: string[], options?: {}): Promise<number> {
        return await exec.exec(this.path, args, options);
    }
}
