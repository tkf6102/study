// 模板引擎 => 类似于{{取值}}  或者 ${模板字符串}
/* let name = 'tkf'
let age = 10
let str = `${name}今年${age}岁`
// console.log(str);
let strMy = '${name}今年${age}岁'
strMy = strMy.replace(/\$\{(.+?)\}/g, function () {
    console.log(arguments,'--');
    return eval(arguments[1]) // arguments 参数1 整个被捕获的内容 参数2 被捕获内容的值 参数3 在字符串中的索引 参数4 整个内容
})
console.log(strMy); */

// ejs第三方模块 拆解模板引擎
let fs = require('fs')
let path = require('path')
let ejs = require('ejs') // 1. 当前路径安装 2. require引入
let str = fs.readFileSync(path.resolve(__dirname,'index.html'),'utf8') // 读取文件(父级路径,基础路径,解读格式)
let newStr =ejs.render(str,{ // 引入模板,传入给定字符串,就会自动取值
    name:'tkf',
    age:10,
    arr:[1,2,3]
})
// console.log(newStr);

let obj = {a:1}
with(obj){ // with语句,将一个对象传入,里面就不用写对象的值,而是直接用里面的内容
    
    console.log(a);
}