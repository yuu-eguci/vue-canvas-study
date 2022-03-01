<template>
  <div>
    <TheCanvas />
    <TheNumberInput
      v-model="theNumber"
    />
    <TheStringInput
      v-model="theString"
    />
  </div>
</template>

<script>
import TheCanvas from '../components/TheCanvas'
import TheNumberInput from '../components/TheNumberInput'
import TheStringInput from '../components/TheStringInput'

export default {
  name: 'Home',

  components: {
    TheCanvas,
    TheNumberInput,
    TheStringInput
  },

  data: () => ({
    theNumber: undefined,
    theString: undefined
  }),

  methods: {
  }
}
</script>
