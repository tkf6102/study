
/* // 二进制码最大能包含的数字是255 
let num =0
for(let i=0; i<8;i++){
    num+= Math.pow(2,i)
}
console.log(num); */

let fs = require('fs')
let path = require('path')
let iconvLite = require('iconv-lite')
let r= fs.readFileSync(path.resolve(__dirname,'gbk.txt'))
// let test= fs.readFileSync(path.resolve(__dirname,'gbk.txt'),'utf-8') // 这个是自己的测试
// console.log(test);
console.log(r);
r = iconvLite.decode(r,'utf-8')
console.log(r);

// 爬虫
// 1. 爬html => 请求人家html 拿到dom,然后自己分析
// 2. 爬数据 => 访问人家接口然后拿到数据
// 3. 拿资源/图片 无头浏览器 mongo+egg 实现一个爬虫
// 1个字符是ascii  文字用的utf8
// 2进制 = 8bit = 1个字节      1024字节=1k   1024k=1M   1024M=1G

