import neostandard, { plugins } from 'neostandard'
import pluginVue from 'eslint-plugin-vue'

export default [
  ...neostandard({
    env: ['browser'],
    ts: true,
    ignores: ['dist/**']
  }),
  ...pluginVue.configs['flat/recommended'],
  {
    // SFC の <script lang="ts"> を TypeScript として解析します。
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: plugins['typescript-eslint'].parser
      }
    }
  }
]
