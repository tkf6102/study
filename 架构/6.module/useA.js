let result = require('./a.js')
console.log(result);
// setTimeout(()=>{
//     console.log(result);
// },1500)


// 断点调试的几种方式
// 1) google浏览器 适合第三方模块的调试(比如webpack)
    // 1. 命令行执行:node --inspect-brk 文档名.js 
    // 2. 浏览器行输入: chrome://inspect
        // 就会出现一个链接,如果没有就在执行第一步一次,有个 open dedicated devtools for node 这句话下面有个链接 就直接开启
    // 3. 可以右键属性 有个add select text 就会在右侧展示,可以看里面的属性


// 测试require的流程(并且学习看源码)
/* 
1. Module.prototype.require 要实现一个require方法 在useA模块中(一个文件就是一个模块,useA就是一个模块,模块有一个自己的原型上的方法require),使用了a.js文件
2. Module._load 加载模块
3. 先查看是否有缓存,有缓存就使用,没有再加载
4. 如果没有缓存,就直接将模块路径转换成绝对路径 ,用这个方法Module._resolveFilename
5. 根据转换的路径,查看是否有缓存机制,如果没有缓存看下是否是原生模块

6. 创建new Module(没查到,就创建模块)
 // new了一类 就是创造一个对象
 // 对象里面有 id = 文件路径
 // exports 就是最后导出的文件
    /* 
    function Module(id = '', parent) {
    this.id = id;
    this.path = path.dirname(id);
    this.exports = {};
    this.parent = parent;
    updateChildren(parent, this, false);
    this.filename = null;
    this.loaded = false;
    this.children = [];
    }

7. 把模块缓存起来,为了下次使用时可以使用上次缓存的模块
8. module.load加载模块
9. 拿到文件拓展名.js 调用对应的模块解析规则
10. 读到文件模块 编译模块文件
11. 包装成函数 并且让函数执行 模块的this指向是exports
*/






*/
// 看源码的步骤非常多
/* 
1. 先看面  => 整体流程 一般是看看目录名字,目录描述
2. 感兴趣  => 就点进去看
3. 工具类的方法不看怎么实现
*/
