<template>
  <div id="app">
    <Select 
      :options = "ary"
      placeholder="传入的请"
      :val = "val"
      @selectval="changeval"
      
    />
  </div>
</template>

<script lang="ts">

import {Component,Vue} from 'vue-property-decorator';
import Select from './components/select.vue';
interface Data {
    text: string;
    id: number;
}

@Component({
  components:{
    Select
  }
})
export default class App extends Vue {
    public val = '';
    private ary: Data[] = [
        {
            text:'橘子',
            id:0
        },
        {
            text:'苹果',
            id:1
        }
    ];
    public changeval(val: string): void{
      this.val = val;
    }
}

</script>

<style>
*{
  margin:0;
  padding:0;
  list-style: none;
  font-size:12px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
