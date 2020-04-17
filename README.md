## Setup Android NDK Toolchain GitHub Action

**Note:** under development

## Usage:

```yaml
      - shell: bash
        run: mkdir toolchains
      - name: specify NDK
        uses: ravinderjangra/android-ndk-toolchain-setup@0.1
        with:
          api: '21'
          arch: 'x86'
          install-location: 'toolchains'
          force: true
```
