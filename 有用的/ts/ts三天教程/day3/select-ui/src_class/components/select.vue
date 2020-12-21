<template>
  <div>
      <input 
        type="text"
        :value="val"
      />
      <ul>
        <li 
          v-for="(val,key) in data" 
          :key="key"
          :class="[
            {
              active:activeNum === key
            }
          ]"
          @mouseover="changeActive(key)"
          @click="changChild(val.text)"
        >
          <span>{{val.text}}</span>
        </li>
       
      </ul>
      {{watchActiveNum()}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Emit,Watch } from 'vue-property-decorator';
interface Data {
  id: number;
  text: string;
}
@Component
export default class Select extends Vue {
  //接收父级传来的数据
  @Prop(Array) public data!: Data[]; 

  @Prop(String) public val!: string; 

  //定义私有属性（数据）
  private activeNum = 0;
  private changeActive(num: number): void{
      this.activeNum = num;
  }

  //点击选中
  // childchange (val: string): void{
  //    this.changChild(val);
  // }

  /*
    click(){
      this.$emit('changeval')
    }
  */
  
  @Watch('activeNum',{deep:true,immediate:true})
  watchActiveNum(){
    return this.activeNum < 10?'0'+this.activeNum:''+this.activeNum;
  }
  @Emit('changeval')
  private changChild(val: string): void{
    console.log(1)
  }

  mounted() {
    console.log(this.data); 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
ul,li{
  list-style: none;
}
li.active{
  background: skyblue;
}
</style>
