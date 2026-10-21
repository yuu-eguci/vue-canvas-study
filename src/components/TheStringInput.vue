<template>
  <v-container>
    <v-text-field
      v-model="innerValue"
      variant="solo"
      label="The string input"
      clearable
      type="text"
      counter
      maxlength="20"
    />
  </v-container>
</template>

<script>
export default {
  name: 'TheStringInput',

  props: {
    modelValue: {
      type: String,
      default: null
    }
  },

  emits: ['update:modelValue'],

  computed: {
    innerValue: {
      get () {
        return this.modelValue
      },
      set (val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
}
</script>
