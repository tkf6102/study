// node 新增了很多东西
// 前端浏览器的js 组成 BOM DOM ECMAscript  node只有ECMA,为了实现功能,新增了很多模块
// 内置模块=核心模块
// commonjs规范 
// 定了模块系统
/* 1)如何定义一个模块
    1)使用: require
    2)模块分类: 针对node
        自定义模块 特点: 开头都有路径 举例: ./fs.js
        内置模块
        第三方模块
    3)模块化的作用
        1. 解决命名冲突  在a模块里叫a  到了b 可以重命名
        2. 方便维护 
    注意两个点,实现commonjs模块导出
        声明对象的方式实现模块化,缺陷是每次调用的时候,增加前缀
        给当前内容增加一个外包的自执行函数
2)如何使用一个模块
3)如何导出一个模块 */
let str = 'hello'
console.log(11)
module.exports = str

// 内置模块
// path 专门处理路径的
// fs 操作文件的
// vm虚拟机
// let path = require('path')
// console.log(path.resolve('a'));// 解析绝对路径,把从根目录到当前目录的路径 =>c:\Users\Administrator\Desktop\学习\架构\6.node\a
// 在vscode右键run code,执行的是 process.cwd() 效果是是当前文件夹的根路径,也就是打开的那个路径的文件,就是那个级别.   
// console.log(path.resolve(__dirname,'a,','b','/')); // path.resolve是会从左到右拼接路径的
// console.log(path.resolve(__dirname,'a,','b','./useA.js')); // 碰到/就会调到根路径
// console.log(path.join(__dirname,'a,','b','/')); // 碰到/就会只是按照/拼接,不会按照路径
// console.log(path.join(__dirname,'a,','b',{})); // 碰到对象会报错
// console.log(path.dirname('b')); // 不存在就会返回 .
// console.log(path.dirname(__dirname)); // 取到文件的父级路径,可以无限取父级
// console.log(path.basename('1.js','.js')); // 基础名字 参数1是文件名称 参数2是刨除的文件后缀 如果没后缀无效果
// console.log(path.extname('1.js')); // 返回文件的最后一次后缀名称 1.min.js 是取最后一次的方法
// console.log(__dirname) // 直接路径 ,到自己的上级
// console.log(__filename) // 文件路径,到自己身上
// let fs = require('fs')

// 右键run code是绝对路径,根据当前代码的根路径计算
// fs方法是同步和异步组成 require方法是同步 因为执行完没回调,直接就可以获取值
// let a = fs.readFile('./4.node的模块/笔记.md',(err,data)=>{
//     console.log(err);
//     console.log(data);
// })

// let a = fs.readFileSync(path.resolve(__dirname,'a.path和fs.js'),'utf-8') // 第一个参数是path,第二个是编码
// 编程特性,不存在编程异常,不存在会报错
// console.log(a);
// let flag = fs.existsSync(path.resolve(__dirname,'a.path和fs.js')) // 查询文件是否存在,返回布尔值 因为这个查询返回值是布尔类型,和node编程不符,所以取消了异步编程
// console.log(flag);

// vm
// 常见类似方法:eval 不干净执行,变量会查找上级作用域
// let fn1 = new Function('a')
// let fn = new Function("console.log('1')")
// console.log(fn.toString());
// console.log(fn()); // 先把consol.log(1)执行 再return undefined了
// console.log(fn1.toString());