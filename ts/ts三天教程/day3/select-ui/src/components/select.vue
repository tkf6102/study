<template>
    <div class="sele_box">
        <input type="text" :class="[
            {
                focus:onoff,
                textchange:!textchange
            }
        ]" 
            v-if="textchange"
            v-model="searchVal"
            @click="changeClick"
            :placeholder="place"
        >
        <input type="text" :class="[
            {
                focus:onoff,
                textchange:!textchange
            }
        ]" 
            v-else
            :value="val"
            @click="changeClick"
            :placeholder="place"
        >
        <ul class="scrollbar" v-show="onoff">
            <li 
                v-for="(val,key) in searchange" 
                :key="key"
                @mouseover="over(key)"
                :class="{
                    hover:key === hoverKey
                }"
                @click="changeSelect(key,val.text)"
            >
               <span :class="{select:select===key}">
                    {{val.text}}
               </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
//textchange?searchange():options
import {Vue,Component,Prop,Emit,Watch} from 'vue-property-decorator';

interface Data {
    text: string;
    id: number;
}

@Component({})
export default class Select extends Vue {

    @Prop({default:'请选择'}) public placeholder: string|undefined;

    @Prop() public options!: Data[];

    @Prop({default:''}) public val: string|undefined;

    @Prop(Boolean) public textchange: boolean|undefined;

    private onoff = false;
    private hoverKey = 0;
    private select = 0;
    private searchVal = '';


    private searchAry: Data[] = this.options;

    private place = this.placeholder;

    @Emit('selectval')
    private emitchange(val: string): void {
        /*
            this.$emit('emitchange',val);
        */
    }
    mounted(): void{
        console.log(this.textchange)
    }

    private changeClick(): void {
        this.onoff = !this.onoff;
    }

    private changeSelect(key: number,val: string): void {
        this.select = key;
        this.changeClick();
        console.log(this.textchange);
        if(this.textchange) {
            this.place = val;
        }else{
            this.emitchange(val);
        }
    }

    // @Watch('searchVal',{immediate:true,deep:true})
     
    //类似于计算属性（ts可以了解下存储器）
    get searchange(): any {
        return this.options.filter(item=>item.text.includes(this.searchVal))
    }

 

    changeval (ev: MouseEvent): void{
        // console.log(this.searchVal)
        this.searchVal = ev.target.value;  
    }

    private over(key: number): void {
        this.hoverKey = key;
    }
}
</script>

<style>
input{
    cursor: pointer;
    height:30px;
    border-radius: 4px;
    color: #606266;
    border:1px solid #dcdfe6;
    outline: none;
    padding: 0 15px;
    user-select:none;
}

input.textchange{
    caret-color: transparent; 
}

.sele_box{
    width:240px;
    position: relative;
    padding-left:30px;
}
.scrollbar {
    position: absolute;
    width:168px;
    border:1px solid #e4e7ed;
    left:34px;
    top:40px;
    padding-top:5px;
    border-radius: 4px;
}
.focus {
    border:1px solid #409eff;
}

.scrollbar li {
    height:20px;
    line-height: 20px;
    cursor: pointer;
    padding-left:5px;
}
.scrollbar li.hover{
    background-color: #f5f7fa;
}
span.select{
    color: #409eff;
    font-weight: 700;
} 


</style>