<template>
  <v-container>
    <v-text-field
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

  data: () => ({
  })
}
</script>
