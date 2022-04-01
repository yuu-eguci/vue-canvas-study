<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
      >
        <v-alert
          dense
          text
          type="success"
        >
          <div>
            Vue.js + Vuetify + Canvas + GitHub Pages
            <v-btn
              class="ms-2"
              elevation="2"
              fab
              x-small
              color="teal"
              href="https://github.com/yuu-eguci/vue-canvas-study"
              target="_blank"
            >
              <v-icon>
                mdi-github
              </v-icon>
            </v-btn>
          </div>
          <h1>
            Vue-Canvas-Study
          </h1>
        </v-alert>
      </v-col>
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
        <v-btn @click="onClickConsoleLogButton">
          Console.log the number and the string
        </v-btn>
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
    onClickConsoleLogButton () {
      console.info({
        theNumber: this.theNumber,
        theString: this.theString
      })
    }
  }
}
</script>
