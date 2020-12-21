<template>
  <div id="app">
    <Select 
      :data="options"
      :val="val"
      @changeval="parentval"
    />
  </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
import Select from './components/select.vue';
interface Data {
  id: number;
  text: string;
}

@Component({
  components:{
    Select
  }
})
export default class App extends Vue {

  private val = '苍狼';
  private options: Data[] = [
    {
      id:0,
      text:'苍狼'
    },
    {
      id:1,
      text:'Json He'
    },
    {
      id:2,
      text:'沐雨♡凉年'
    }
  ]; 

  private parentval(val: string): void{
      // console.log(val,'父类');
      this.val = val;
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
