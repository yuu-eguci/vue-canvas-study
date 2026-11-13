<template>
  <TheNumberInput model-value="abc" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheNumberInput from '@/components/TheNumberInput.vue'

// アプリの型検査が効いていることを確かめるため、わざと型の間違いを入れています。
export default defineComponent({
  name: 'TypeErrors',

  components: {
    TheNumberInput
  },

  data: () => ({
    canvasWidth: 0
  }),

  methods: {
    shrink () {
      this.canvasWidth = '240px'
    }
  }
})
</script>
