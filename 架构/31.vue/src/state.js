import {observe} from './observe/index.js'
export function initState(vm) {
    const opts = vm.$options;
    // vue的数据来源很多 比如: data computed watch 属性(props) methods
    // 这个顺序是源码里面标识好的,  按照 props methods data computed watc 顺序
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethods(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }

}
function proxy(vm,source,key){ // 为的是vm._data.aa 取值不太方便,所以为了方便用户取值,多做一层代理, vm.aa 就可以直接取值 取值实际还是vm._data.aa的值
    // 此处自己有报错，实现无线内存溢出。 原因是给defineProperty设置值的时候，vm，source了 实际上响应属性是按照 vm的key取值 返回vm[source][key]
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key]= newValue;
        }
    })
}
// 为什么这些处理数据函数不分割出去? 因为这些是主线数据
function initProps(vm) { }
function initData(vm) {
    let data = vm.$options.data // vue有检测,对$开头的属性不会进行代理
    // 1. 把data数据挂在到vm 也就是vue实例上 也就可以使用this._data使用了
    // 2. 如果data是函数,需要让他执行,但是这里面的this就会跑偏,所以使用.call执行绑定this指向 
    data = vm._data= typeof data === 'function' ? data.call(vm) : data;

    for(let key in data){
        proxy(vm,'_data',key)
    }

    // 数据劫持 数据更新需要收到提示,更新页面
    // mvvm 数据变化需要驱动视图变化
    // Object.definedProperty 给属性添加set 和get方法
    observe(data); // 响应式原理
}
function initComputed(vm) { }
function initWatch(vm) { }
function initMethods(vm) { }