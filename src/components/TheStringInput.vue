<template>
  <v-container>
    <v-text-field
      v-model="innerValue"
      variant="solo"
      label="The string input"
      clearable
      type="text"
      counter
      persistent-counter
      maxlength="20"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'TheStringInput',

  props: {
    modelValue: {
      type: String as PropType<string | null>,
      default: null
    }
  },

  emits: ['update:modelValue'],

  computed: {
    innerValue: {
      get () {
        return this.modelValue
      },
      set (val: string | null) {
        this.$emit('update:modelValue', val)
      }
    }
  }
})
</script>
