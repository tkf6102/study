// 数据类型(去重) 
// set 去重
// map 对象存储 key值可以用对象
// weakmap key值必须是对象 弱引用 引用的对象被置为null就会垃圾回收,而正常map不会   
// 不能存储相同的值

// has set get 方法用来取值
let a = new Map([
    ['a',1], // 传值必须是数组 里面的是可以键值对的值
    ['b',2]
])
a.set('key','value')
a.set({},'1')
let aaa ={}
a.set(aaa,33)
a.set(aaa,22) // 取值后设置的,会把前面的顶替. 不能存储相同的值
console.log(a);

Object.prototype.toString.call(new Set) // [object set] 用symbol元编程修改了

