<template>
  <div class="about">
    <h1>This is an about page</h1>
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
  created() {
    // 进入about才挂载,所以需要先进入
    bus.$on('clear', msg => {
      console.log(msg);
    })
    console.log(bus);
  }
}
</script>
