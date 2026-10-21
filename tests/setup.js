import { config } from '@vue/test-utils'
import vuetify from '../src/plugins/vuetify'

// jsdom には ResizeObserver がないため、 Vuetify が使う最低限の代替を用意します。
globalThis.ResizeObserver ??= class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

config.global.plugins = [vuetify]
