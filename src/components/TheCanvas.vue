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
        <div>
          <VueDrawingCanvas
            ref="VueCanvasDrawing"
            :eraser="eraser"
            background-color="#fffaeb"
            width="300"
            height="200"
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
              @click="onClickSetImageA"
              dark
              color="teal"
            >
              Set image A
            </v-btn>
          </v-col>
          <v-col
            cols="6"
          >
            <v-btn
              block
              @click="onClickSetImageB"
              dark
              color="teal"
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

export default {
  name: 'TheCanvas',

  components: {
    VueDrawingCanvas
  },

  data: () => ({
    eraser: false,
    backgroundImage: null
  }),

  mounted: function () {
  },

  methods: {
    downloadCanvas: function () {
      const canvas = this.$refs.VueCanvasDrawing.$el
      const base64 = canvas.toDataURL('image/jpeg')
      const link = document.createElement('a')
      link.href = base64
      link.download = 'download'
      link.click()
    },

    onClickResetCanvas: function () {
      this.backgroundImage = null
      this.$refs.VueCanvasDrawing.reset()
    },

    onClickSetImageA: function () {
      this.backgroundImage = require('@/assets/penta.png')
      this.$refs.VueCanvasDrawing.redraw()
    },

    onClickSetImageB: function () {
      this.backgroundImage = require('@/assets/hexa.png')
      this.$refs.VueCanvasDrawing.redraw()
    }
  }
}
</script>
