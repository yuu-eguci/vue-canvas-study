import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'

// jsdom には ResizeObserver がないため、 Vuetify が使う最低限の代替を用意します。
globalThis.ResizeObserver ??= class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

config.global.plugins = [createVuetify()]
