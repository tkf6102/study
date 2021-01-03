// 面试问: exports 和 commonjs规范的导入导出的区别是什么
// es6 esModule 是发送http请求
// export default 和export 可以混用
// export default 是导出具体的值
/*     export { // 这个导出的是一个接口(可以理解为一个列表 列表里有a,并不是一个对象里的简写a:a ),接口更新,导出的数据会自动更新
        a
    }
    import {a} // 获取的方式就是解构列表 */
// commonjs是文件读写(fs.readFile) 
// module.exports和exports default 不能功能用

const fs = require('fs')
const path = require('path') // 因为相对路径会经常出问题,所以直接使用path路径
// 无文件会直接创造文件 
let ws = fs.createWriteStream(path.resolve(__dirname, 'copy.txt'), {

    flags: 'w', 
    mode: 0o666, 
    autoClose: true, 
    encoding: 'utf-8', 
    highWaterMark: 2, // 读是每次限制读入个数,但是写会在调用ws.write事件的时候判定写入总内容(多次write事件)和highWaterMark对比,如果超出限制,返回值返回一个boolean值,超出限制个数就会返回false 
})

// 文件的读写会根据写入顺序用链表存储,如果多个线程操纵一个文件,就会用链表排列任务.只有第一个是直接写入文件
let flag = ws.write('o',function(){
    // console.log('o OK');
})
console.log(flag); //返回true是因为这里的highWaterMark的限制是2个字符,只写入一个'o'是2个字符,所以返回true
flag = ws.write('k',function(){
    // console.log('k Ok');
})
console.log(flag); // 返回false是因为这里的highWaterMark限制2个字符,但是'o'加上'k' 是4个,所以返回false了
ws.end('100')  // 常用end事件 代表 write第一个参数的数据和自动回调close事件
ws.on('close', function () {
    // console.log('close事件');
})