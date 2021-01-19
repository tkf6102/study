const ejs = require('ejs')
const fs = require('fs')
// ejs.renderFile('./template2.html',{arr:[1,2,3]},function(err,data){
//     console.log(data);
// });

// 字符串替换文字-简单版
// function renderFile(filePath,data,cb){ 
//    let content= fs.readFileSync(filePath,'utf-8')
//    content = content.replace(/<%=(.+?)%>/g,function(){
//        return data[arguments[1]]
//    })
//    cb(content)
// }
// renderFile('./template1.html',{name:'zf',age:10},function(err,data){
//     console.log(err,'失败回调');
//     console.log(data,'成功回调');
// })

let str = '123213'
// replace和正则
str = str.replace(/\d+/g, function (one, two, three) {
    // console.log(one); // 第一个参数是捕获到的值
    // console.log(two); // 第二个是捕获到的值的索引
    // console.log(three); // 整体字符串
    return 1; // 把捕获到的值替换为回调函数的返回值 ,不写就是undefined
})
// replace和正则分组
str = str.replace(/12(33453)4df(gd)gfw\d+/g, function (one, two, three) {
    // console.log(one); // 第一个参数是大正则捕获的值
    // console.log(two); // 第二个参数是分组1捕获的值,
    // console.log(three); // 第三个参数是分组2捕获的值 依次类推 一直到没有分组捕获的值,才给索引及字符串整体
    return 1;
})
// 字符串替换数组循环
function renderFile(filePath, data, cb) {
    let content = fs.readFileSync(filePath, 'utf-8'); // 1. 读取文件
    content = content.replace(/<%=(.+?)%>/g, function () { // 根据文件内容字符串检索<%= 这个字段,就替换成${ arguments[1] } 这里的arguments[1] 是固定的正则的分组1的值 
        // console.log(arguments);
        return "${" + arguments[1] + "}" // 正则的回调返回值就会替代匹配出来的值 和<%=
    })
    let head = " let str='';\r\nwith(obj){\r\n"; // 初始化一个字符串,但是需要用with函数, 被with函数包裹的数据取值会优先从obj里取值(相当于创建了一个作用域)
    head += "  str= `"

    content = content.replace(/<%(.+?)%>/g, function () { // 开始匹配除了item等变量部分
        // console.log(arguments);
        return "`\r\n" + arguments[1] + "\r\nstr+=`" // 依旧从正则的分组1里取值 然后让str继续拼接
    })
    let tail = "`}\r\nreturn str"; // 字符串结尾部分, 有with的结尾},和函数匹配的返回str
    let templateStr = head + content + tail; // 把头部分 身体  结尾组合
    let fn = new Function('obj', templateStr); // 把拼接好的字符串传递给新函数,并且指定形参为'obj'(因为with(obj)初始化的时候用的obj)
    cb(null, fn(data)) // 走渲染文件的回调
}
renderFile('./template2.html', { arr: [1, 2, 3] }, function (err, data) { 
    // 1. 需要传递三个参数,文件路径 2. 渲染路径需要的数据 3. 回调
    // console.log(err, '失败回调');
    console.log(data, '成功回调');
})



/*
    模板引擎其实就是
    1. 读取文件(模板),是个字符串
    2. 替换其特殊语法(例如{{小胡子}} <%%>)等
    3. 引入到函数中
    4. with取值
    5. 函数执行 拼接字符串
*/


