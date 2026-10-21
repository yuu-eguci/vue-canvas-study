<template>
  <v-container>
    <v-text-field
      v-model="innerValue"
      variant="solo"
      label="The number input"
      clearable
      type="number"
    />
  </v-container>
</template>

<script>
export default {
  name: 'TheNumberInput',

  props: {
    modelValue: {
      type: Number,
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
        // 空欄や clear のときは 0 ではなく null を返します。
        this.$emit('update:modelValue', val === '' || val === null ? null : Number(val))
      }
    }
  }
}
</script>
