import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../src/views/HomeView.vue'

describe('HomeView', () => {
  it('入力した数値と文字列を console.info に出します', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {})
    const wrapper = mount(HomeView, {
      global: { stubs: { TheCanvas: true } }
    })
    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('3')
    await inputs[1].setValue('abc')

    await wrapper.findAll('button').find(b => b.text().startsWith('Console.log')).trigger('click')

    expect(info).toHaveBeenCalledWith({ theNumber: 3, theString: 'abc' })
    info.mockRestore()
  })
})
