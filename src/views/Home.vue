<template>
  <div>
    <TheCanvas />
    <TheNumberInput
      v-model="theNumber"
    />
    <TheStringInput
      v-model="theString"
    />
    <v-btn
      class="mx-2"
      fab
      dark
      large
      color="success"
      @click="onClickButton"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>
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
    onClickButton: function () {
      console.info({
        theNumber: this.theNumber,
        theString: this.theString
      })
    }
  }
}
</script>
