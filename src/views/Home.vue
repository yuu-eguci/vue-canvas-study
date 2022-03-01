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
          </div>
          <h1>
            Vue-Canvas-Study
            <v-btn
              class="ms-2"
              fab
              small
              color="teal"
            >
              <v-icon>
                mdi-github
              </v-icon>
            </v-btn>
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
