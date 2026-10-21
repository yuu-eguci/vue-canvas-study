import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TheStringInput from '../src/components/TheStringInput.vue'

describe('TheStringInput', () => {
  it('入力した文字列を emit します', async () => {
    const wrapper = mount(TheStringInput)
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['hello'])
  })

  it('20 文字までに制限します', () => {
    const wrapper = mount(TheStringInput)
    expect(wrapper.find('input').attributes('maxlength')).toBe('20')
  })

  it('フォーカスしていなくても文字数カウンタを表示します', () => {
    const wrapper = mount(TheStringInput, { props: { modelValue: 'abc' } })
    const counter = wrapper.find('.v-counter')
    expect(counter.isVisible()).toBe(true)
    expect(counter.text()).toBe('3 / 20')
  })
})
