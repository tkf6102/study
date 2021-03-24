import {initState} from './state'
import {compileToFunction} from './compile/index'
export function initMixin(Vue){
    //  可以扩展很多原型方法
    Vue.prototype._init = function(options){
        const vm = this;
        vm.$options = options; // 原型上的状态挂载到vm实例上
        // 分割代码
        initState(vm); // 初始化状态 做数据劫持 所有数据都监听
        if(vm.$options.el){

            // 如果有元素 需要将数据挂在到这个模板上
            vm.$mounted(vm.$options.el)
        }
    }
    Vue.prototype.$mounted = function(el){
        el = document.querySelector(el);
        let vm = this; // 获取自己
        let options = vm.$options;
        if(!options.render){ // 如果render函数没有 => render函数就是渲染函数,他的优先级比el的优先级更高,因为后期还是会做成渲染函数,每次执行都是调用渲染函数
            let template = options.template
            if(!template && el){ // 如果模板也没有 => 这个是组件里的template部分,
                template = el.outerHTML;
              let render=   compileToFunction(template); // 把当前模板变成一个函数
              options.render = render; // 把编译后的模板函数直接传递给options.render属性,后期就可以直接使用这个属性
            }   
        }
    }
}