// 模块的加载顺序
// 11.13版本 默认不写后缀
/*     
    1.) 查找文件 无文件 
    1.5) 查找文件下的index  
    2.) 如果有package.json,会以package.json为准

*/
// 如果没有路径,可能是核心模块,也可能是第三方模块 node_modules里
// 自动核心查找,没有就去node_modules查找
// 第三方模块查找顺序: 使用方法是:module.path(会从当前路径一级一级向上查找(父路径后拼接node_modules),直接c/d/e/f盘位置)
let a = require('a.js')
console.log(a);