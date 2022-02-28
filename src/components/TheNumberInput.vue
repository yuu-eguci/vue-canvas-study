<template>
  <v-container>
    <v-text-field
      v-model="innerValue"
      solo
      label="The number input"
      clearable
      type="number"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  name: 'TheNumberInput',

  props: {
    value: {
      type: Number,
      required: false
    }
  },

  data: () => ({
  }),

  computed: {
    innerValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', Number(val))
      }
    }
  }
}
</script>
