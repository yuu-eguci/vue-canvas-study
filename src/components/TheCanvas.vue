<template>
  <v-container>
    <v-card
      elevation="2"
      class="p-3"
    >
      <v-card-title>
        The handwriting
      </v-card-title>
      <v-card-text>
        <div ref="canvasWrapper">
          <VueDrawingCanvas
            v-if="canvasWidth"
            ref="VueCanvasDrawing"
            :eraser="eraser"
            background-color="#fffaeb"
            :width="canvasWidth"
            :height="canvasHeight"
            :background-image="backgroundImage"
          />
        </div>
      </v-card-text>
      <v-card-text>
        <v-row
          class="mt-2"
        >
          <v-col
            cols="6"
          >
            <v-btn
              block
              color="success"
              :disabled="!eraser"
              @click="() => { eraser = false }"
            >
              Draw
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              color="warning"
              :disabled="eraser"
              @click="() => { eraser = true }"
            >
              Eraser
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              @click="$refs.VueCanvasDrawing.undo()"
            >
              Undo
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              @click="$refs.VueCanvasDrawing.redo()"
            >
              Redo
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              color="error"
              @click.prevent="onClickResetCanvas"
            >
              Reset
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              @click="downloadCanvas"
            >
              Download
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              color="teal"
              @click="onClickSetImageA"
            >
              Set image A
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              color="teal"
              @click="onClickSetImageB"
            >
              Set image B
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import VueDrawingCanvas from 'vue-drawing-canvas'
import imageA from '@/assets/penta.png'
import imageB from '@/assets/hexa.png'

// vue-drawing-canvas は CSS で縮めると描画座標がずれるため、 canvas 自体のサイズを親の幅に合わせます。
const MAX_CANVAS_WIDTH = 300

export default {
  name: 'TheCanvas',

  components: {
    VueDrawingCanvas
  },

  data: () => ({
    eraser: false,
    backgroundImage: null,
    canvasWidth: 0
  }),

  computed: {
    canvasHeight () {
      return Math.round(this.canvasWidth * 2 / 3)
    }
  },

  mounted () {
    this.canvasWidth = Math.min(MAX_CANVAS_WIDTH, this.$refs.canvasWrapper.clientWidth)
    window.addEventListener('keydown', this.onKeydown)
  },

  beforeUnmount () {
    window.removeEventListener('keydown', this.onKeydown)
  },

  methods: {
    downloadCanvas: function () {
      const canvas = this.$refs.VueCanvasDrawing.$el
      const base64 = canvas.toDataURL('image/jpeg')
      const link = document.createElement('a')
      link.href = base64
      link.download = 'vue-canvas-study.jpg'
      link.click()
    },

    onKeydown (event) {
      // 入力欄では、入力欄自身の Undo / Redo を優先します。
      if (!(event.ctrlKey || event.metaKey) || event.target.closest?.('input, textarea')) {
        return
      }
      const key = event.key.toLowerCase()
      if (key === 'z' && !event.shiftKey) {
        this.$refs.VueCanvasDrawing.undo()
      } else if (key === 'y' || (key === 'z' && event.shiftKey)) {
        this.$refs.VueCanvasDrawing.redo()
      } else {
        return
      }
      event.preventDefault()
    },

    onClickResetCanvas: function () {
      this.backgroundImage = null
      this.$refs.VueCanvasDrawing.reset()
    },

    onClickSetImageA: function () {
      this.backgroundImage = imageA
      this.$refs.VueCanvasDrawing.redraw()
    },

    onClickSetImageB: function () {
      this.backgroundImage = imageB
      this.$refs.VueCanvasDrawing.redraw()
    }
  }
}
</script>
