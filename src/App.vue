<template>
  <v-app>
    <v-main>
      <HomeView />
    </v-main>
  </v-app>
</template>

<script>
import HomeView from './views/HomeView.vue'

export default {
  name: 'App',

  components: {
    HomeView
  }
}
</script>
