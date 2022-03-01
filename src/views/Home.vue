<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="6"
      >
        <TheCanvas />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <TheNumberInput
          v-model="theNumber"
        />
        <TheStringInput
          v-model="theString"
        />
      </v-col>
    </v-row>
  </v-container>
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
