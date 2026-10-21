import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TheCanvas from '../src/components/TheCanvas.vue'

const VueDrawingCanvasStub = {
  name: 'VueDrawingCanvas',
  props: ['eraser', 'backgroundImage'],
  template: '<canvas />',
  methods: {
    reset: vi.fn(),
    redraw: vi.fn()
  }
}

const mountCanvas = () => mount(TheCanvas, {
  global: { stubs: { VueDrawingCanvas: VueDrawingCanvasStub } }
})

const findButton = (wrapper, text) => wrapper.findAll('button').find(b => b.text() === text)

describe('TheCanvas', () => {
  it('Eraser と Draw でモードを切り替えます', async () => {
    const wrapper = mountCanvas()
    const canvas = wrapper.findComponent({ name: 'VueDrawingCanvas' })
    expect(canvas.props('eraser')).toBe(false)
    expect(findButton(wrapper, 'Draw').attributes('disabled')).toBeDefined()

    await findButton(wrapper, 'Eraser').trigger('click')
    expect(canvas.props('eraser')).toBe(true)
    expect(findButton(wrapper, 'Eraser').attributes('disabled')).toBeDefined()

    await findButton(wrapper, 'Draw').trigger('click')
    expect(canvas.props('eraser')).toBe(false)
  })

  it('Set image で背景画像を設定し、 Reset で消します', async () => {
    const wrapper = mountCanvas()
    const canvas = wrapper.findComponent({ name: 'VueDrawingCanvas' })

    await findButton(wrapper, 'Set image A').trigger('click')
    expect(canvas.props('backgroundImage')).toMatch(/penta.*\.png/)

    await findButton(wrapper, 'Set image B').trigger('click')
    expect(canvas.props('backgroundImage')).toMatch(/hexa.*\.png/)

    await findButton(wrapper, 'Reset').trigger('click')
    expect(canvas.props('backgroundImage')).toBeNull()
    expect(VueDrawingCanvasStub.methods.reset).toHaveBeenCalled()
  })

  it('Download で canvas を JPEG としてダウンロードします', async () => {
    const wrapper = mountCanvas()
    const canvasElement = wrapper.find('canvas').element
    canvasElement.toDataURL = vi.fn(() => 'data:image/jpeg;base64,xxx')
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    await findButton(wrapper, 'Download').trigger('click')

    expect(canvasElement.toDataURL).toHaveBeenCalledWith('image/jpeg')
    const link = click.mock.contexts[0]
    expect(link.href).toBe('data:image/jpeg;base64,xxx')
    expect(link.download).toBe('download')
    click.mockRestore()
  })
})
