import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { VBtn } from 'vuetify/components'
import colors from 'vuetify/util/colors'
import vuetify from '../src/plugins/vuetify'
import TheCanvas from '../src/components/TheCanvas.vue'
import HomeView from '../src/views/HomeView.vue'
import { VAlert } from 'vuetify/components'

const luminance = (hex) => {
  const full = hex.length === 4 ? hex.replace(/\w/g, c => c + c) : hex
  const [r, g, b] = full.match(/[0-9a-f]{2}/gi).map(v => {
    const c = parseInt(v, 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
// tonal は文字色を 12% だけ白に重ねた背景になります (ブラウザでの実測値と一致します) 。
const tonalBackground = (hex) => '#' + hex.match(/[0-9a-f]{2}/gi)
  .map(v => Math.round(255 - (255 - parseInt(v, 16)) * 0.12).toString(16).padStart(2, '0'))
  .join('')

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// color prop を背景色と文字色に変換します。 theme の色は on-xxx 、パレットの色は白文字になります。
const resolve = (name) => {
  const themeColors = vuetify.theme.current.value.colors
  if (themeColors[name]) {
    return { background: themeColors[name], text: themeColors[`on-${name}`] }
  }
  const [base, shade] = name.split(/-(?=(?:lighten|darken|accent)-)/)
  const camel = (s) => s.replace(/-(\w)/g, (_, c) => c.toUpperCase())
  const palette = colors[camel(base)]
  return { background: shade ? palette[camel(shade)] : palette.base, text: '#ffffff' }
}

describe('ボタンの色', () => {
  it('色つきボタンは文字とのコントラストが WCAG AA (4.5:1) 以上です', () => {
    const wrapper = mount(TheCanvas, {
      global: { stubs: { VueDrawingCanvas: true } }
    })
    const buttons = wrapper.findAllComponents(VBtn).filter(b => b.props('color'))
    expect(buttons.length).toBeGreaterThan(0)
    for (const button of buttons) {
      const { background, text } = resolve(button.props('color'))
      expect(contrast(background, text), `${button.text()} (${button.props('color')})`).toBeGreaterThanOrEqual(4.5)
    }
  })
  it('ヘッダーの tonal alert は文字とのコントラストが WCAG AA (4.5:1) 以上です', () => {
    const wrapper = mount(HomeView, {
      global: { stubs: { TheCanvas: true } }
    })
    const alert = wrapper.findComponent(VAlert)
    const { background: text } = resolve(alert.props('color') ?? alert.props('type'))
    expect(contrast(text, tonalBackground(text))).toBeGreaterThanOrEqual(4.5)
  })
})
