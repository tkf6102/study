<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="trigger">
  </div>
</template>

<script>
// @ is an alias to /src
import bus from "../bus";
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  methods: {
    trigger() {
      bus.$emit('clear', 'newProgram')
    }
  }
}
</script>
