<template>
  <div>
    <TheCanvas />
    <TheNumberInput />
    <TheStringInput />
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
  }
}
</script>
