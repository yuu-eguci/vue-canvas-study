import { afterEach } from 'vitest'
import { config, enableAutoUnmount } from '@vue/test-utils'
import vuetify from '../src/plugins/vuetify'

// jsdom には ResizeObserver がないため、 Vuetify が使う最低限の代替を用意します。
globalThis.ResizeObserver ??= class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

config.global.plugins = [vuetify]

// window に登録した listener がテスト間で残らないよう、毎回 unmount します。
enableAutoUnmount(afterEach)
