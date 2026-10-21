import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TheNumberInput from '../src/components/TheNumberInput.vue'

describe('TheNumberInput', () => {
  it('入力した文字列を数値にして emit します', async () => {
    const wrapper = mount(TheNumberInput)
    await wrapper.find('input').setValue('42')
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([42])
  })

  it('空にしたときは 0 ではなく null を emit します', async () => {
    const wrapper = mount(TheNumberInput, { props: { modelValue: 42 } })
    await wrapper.find('input').setValue('')
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([null])
  })

  it('親から渡された値を表示します', () => {
    const wrapper = mount(TheNumberInput, { props: { modelValue: 7 } })
    expect(wrapper.find('input').element.value).toBe('7')
  })
})
