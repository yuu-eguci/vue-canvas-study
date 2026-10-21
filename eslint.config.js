import neostandard from 'neostandard'
import pluginVue from 'eslint-plugin-vue'

export default [
  ...neostandard({
    env: ['browser'],
    ignores: ['dist/**']
  }),
  ...pluginVue.configs['flat/recommended']
]
