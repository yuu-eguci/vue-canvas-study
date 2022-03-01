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
          />
        </div>
        <div
          class="mt-2"
        >
          <v-btn
            class="mx-2"
            color="success"
            :disabled="!eraser"
            @click="() => { eraser = false }"
          >
            Draw
          </v-btn>

          <v-btn
            class="mx-2"
            color="warning"
            :disabled="eraser"
            @click="() => { eraser = true }"
          >
            Eraser
          </v-btn>

          <v-btn
            class="mx-2"
            color="error"
            @click.prevent="$refs.VueCanvasDrawing.reset()"
          >
            Reset
          </v-btn>

          <v-btn
            class="mx-2"
            @click="downloadCanvas"
          >
            Download
          </v-btn>
        </div>
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
    eraser: false
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
    }
  }
}
</script>
