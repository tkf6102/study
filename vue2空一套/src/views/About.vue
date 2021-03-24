<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{TEST}}
    {{test}}
  </div>
</template>

<script>
import mixinTest from './mixinTest.vue'
export default {
  data(){
    return {
      TEST:2
    }
  },
  created(){
    console.log(this.All);
  },
  mixins:[mixinTest]

}
</script>