import { isObj } from '../utils/index.js'
// 把传入的数据都用object.definedPerty从新定义
import { arrayMethods } from './array.js' // 所有数组方法重写

// 1. 如果是对象,会将对象不停循环递归进行检测
// 2. 如果是对象,会劫持数组方法,并对数组中不是基本数据类型进行检测

class Observe {
    constructor(value) {
        // vue2中 会递归对value里的值用Object.definedproperty属性增加get/set方法,初始化就添加,很浪费性能
        // vue3中 使用proxy不用递归添加
        Object.defineProperty(value,'__ob__',{
            value:this,
            enumerable:false
        })
        if (Array.isArray(value)) {
            // value.__ob__ = this;
    
            // 如果是数组的话,并不会对索引进行观测. 这样递归循环会消耗很大的性能
            // 前端开发中很少很少操作索引 一般是Push shift unshiftw方法
            // __proto__是指向实例所属类的原型,因为这里只能控制到实例,所以使用__proto__ 
            value.__proto__ = arrayMethods; //  把数组的push,shift等方法都重写了,因为代码很多就放在单独的文件里
            // 如果数组里放的是对象 我再监控
            this.observeArray(value)
        } else {
            this.walk(value) // 观测一步的数据
        }
    }
    observeArray(value) { // 只要是对象,哪怕是数组里的对象,还是需要递归监控的. 性能比较差
        value.forEach(item => {
            // 处理了数组中每一个对象
            observe(item)
        })
    }
    walk(data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            // 其实就是循环执行响应式
            definedReactive(data, key, data[key])
        })
    }
}
function definedReactive(data, key, value) {
    // 不是判断data,因为data是永远是对象. 而value是每次循环出来的值
    // 递归判断value是不是个对象,如果是个对象就还是会执行new Observe
    // 
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if (value == newValue) return;
            observe(newValue);  // 劫持数据,因为有可能用户把原有的对象直接赋值为新对象,这样是没对新对象进行数据劫持,所以需要observe递归检测一下
            value = newValue; // 感觉每次设置值的时候就会自动把原有值转换为新值
        }
    })
}
export function observe(data) {
    let isObject = isObj(data); // 其实这个对象本意上判断两层,第一个层是判断是否是对象 2. 后期会递归,但是如果不是对象就不会递归了
    if (!isObject) return;
    if (data['__ob__']) return;
    // 专门用来格式化数据的项目
    return new Observe(data)
}