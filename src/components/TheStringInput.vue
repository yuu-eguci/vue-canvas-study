<template>
  <v-container>
    <v-text-field
      v-model="innerValue"
      solo
      label="The string input"
      clearable
      type="text"
      counter
      maxlength="20"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  name: 'TheStringInput',

  props: {
    value: {
      type: String,
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
        this.$emit('input', val)
      }
    }
  }
}
</script>
