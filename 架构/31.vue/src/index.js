import { initMixin } from "./init";
import { renderMixin } from "./render";
import { lifecycleMixin } from "./lifecycle";

// 大Vue的初始化
function Vue(options){
    this._init(options)
}
// 给原型上挂载方法的处理函数, 防止每次给原型挂载方法都在主页面,很冗余.
initMixin(Vue) // 初始化属性
renderMixin(Vue); // _render render函数形成及挂载在页面属性里
lifecycleMixin(Vue); // _update
export default Vue;