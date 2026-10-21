import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TheCanvas from '../src/components/TheCanvas.vue'

const VueDrawingCanvasStub = {
  name: 'VueDrawingCanvas',
  props: ['eraser', 'backgroundImage', 'width', 'height'],
  template: '<canvas />',
  methods: {
    reset: vi.fn(),
    redraw: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn()
  }
}

// canvas は親の幅を測ったあとに描画されるため、再描画を待ってから返します。
const mountCanvas = async () => {
  const wrapper = mount(TheCanvas, {
    global: { stubs: { VueDrawingCanvas: VueDrawingCanvasStub } }
  })
  await wrapper.vm.$nextTick()
  return wrapper
}

const findButton = (wrapper, text) => wrapper.findAll('button').find(b => b.text() === text)

// jsdom はレイアウトを計算しないため、 canvas の親要素の幅を差し替えます。
const mockClientWidth = (width) => vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(width)

describe('TheCanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockClientWidth(500)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('幅に余裕があるときは 300 x 200 で表示します', async () => {
    const canvas = (await mountCanvas()).findComponent({ name: 'VueDrawingCanvas' })
    expect(canvas.props('width')).toBe(300)
    expect(canvas.props('height')).toBe(200)
  })

  it('親の幅が 300 未満のときは幅に収まるよう 3:2 で縮めます', async () => {
    mockClientWidth(240)
    const canvas = (await mountCanvas()).findComponent({ name: 'VueDrawingCanvas' })
    expect(canvas.props('width')).toBe(240)
    expect(canvas.props('height')).toBe(160)
  })

  it('Eraser と Draw でモードを切り替えます', async () => {
    const wrapper = await mountCanvas()
    const canvas = wrapper.findComponent({ name: 'VueDrawingCanvas' })
    expect(canvas.props('eraser')).toBe(false)
    expect(findButton(wrapper, 'Draw').attributes('disabled')).toBeDefined()

    await findButton(wrapper, 'Eraser').trigger('click')
    expect(canvas.props('eraser')).toBe(true)
    expect(findButton(wrapper, 'Eraser').attributes('disabled')).toBeDefined()

    await findButton(wrapper, 'Draw').trigger('click')
    expect(canvas.props('eraser')).toBe(false)
  })

  it('Undo と Redo で直前の線を戻したりやり直したりします', async () => {
    const wrapper = await mountCanvas()

    await findButton(wrapper, 'Undo').trigger('click')
    expect(VueDrawingCanvasStub.methods.undo).toHaveBeenCalledOnce()

    await findButton(wrapper, 'Redo').trigger('click')
    expect(VueDrawingCanvasStub.methods.redo).toHaveBeenCalledOnce()
  })

  it('Ctrl / Cmd + Z で Undo 、 Ctrl + Y や Ctrl / Cmd + Shift + Z で Redo します', async () => {
    await mountCanvas()
    const { undo, redo } = VueDrawingCanvasStub.methods

    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }))
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', metaKey: true, bubbles: true }))
    expect(undo).toHaveBeenCalledTimes(2)

    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'y', ctrlKey: true, bubbles: true }))
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Z', metaKey: true, shiftKey: true, bubbles: true }))
    expect(redo).toHaveBeenCalledTimes(2)
    expect(undo).toHaveBeenCalledTimes(2)
  })

  it('修飾キーなし、入力欄の中、 Cmd + Y では Undo / Redo しません', async () => {
    await mountCanvas()
    const input = document.createElement('input')
    document.body.appendChild(input)

    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', bubbles: true }))
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }))
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'y', ctrlKey: true, bubbles: true }))
    // Mac の Cmd + Y はブラウザの履歴なので奪いません。
    const cmdY = new KeyboardEvent('keydown', { key: 'y', metaKey: true, bubbles: true, cancelable: true })
    document.body.dispatchEvent(cmdY)
    expect(cmdY.defaultPrevented).toBe(false)

    expect(VueDrawingCanvasStub.methods.undo).not.toHaveBeenCalled()
    expect(VueDrawingCanvasStub.methods.redo).not.toHaveBeenCalled()
    input.remove()
  })

  it('unmount するときに keydown の listener を外します', async () => {
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    const wrapper = await mountCanvas()
    const [, handler] = add.mock.calls.find(([type]) => type === 'keydown')

    wrapper.unmount()

    expect(remove).toHaveBeenCalledWith('keydown', handler)
  })

  it('Set image で背景画像を設定し、 Reset で消します', async () => {
    const wrapper = await mountCanvas()
    const canvas = wrapper.findComponent({ name: 'VueDrawingCanvas' })

    // ライブラリは backgroundImage が変わっても描き直さないため、 redraw を呼ぶ必要があります。
    await findButton(wrapper, 'Set image A').trigger('click')
    expect(canvas.props('backgroundImage')).toMatch(/penta.*\.png/)
    expect(VueDrawingCanvasStub.methods.redraw).toHaveBeenCalledTimes(1)

    await findButton(wrapper, 'Set image B').trigger('click')
    expect(canvas.props('backgroundImage')).toMatch(/hexa.*\.png/)
    expect(VueDrawingCanvasStub.methods.redraw).toHaveBeenCalledTimes(2)

    await findButton(wrapper, 'Reset').trigger('click')
    expect(canvas.props('backgroundImage')).toBeNull()
    expect(VueDrawingCanvasStub.methods.reset).toHaveBeenCalled()
  })

  it('Download で canvas を JPEG としてダウンロードします', async () => {
    const wrapper = await mountCanvas()
    const canvasElement = wrapper.find('canvas').element
    canvasElement.toDataURL = vi.fn(() => 'data:image/jpeg;base64,xxx')
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    await findButton(wrapper, 'Download').trigger('click')

    expect(canvasElement.toDataURL).toHaveBeenCalledWith('image/jpeg')
    const link = click.mock.contexts[0]
    expect(link.href).toBe('data:image/jpeg;base64,xxx')
    expect(link.download).toBe('vue-canvas-study.jpg')
    click.mockRestore()
  })
})
