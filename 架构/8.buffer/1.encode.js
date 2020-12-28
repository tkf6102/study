// Buffer读取出来的都是16进制
/* // 二进制码最大能包含的数字是255 
let num =0
for(let i=0; i<8;i++){
    num+= Math.pow(2,i)
}
console.log(num); */

// 用iconv-lite解析中文
/* let fs = require('fs')
let path = require('path')
let iconvLite = require('iconv-lite')
let r= fs.readFileSync(path.resolve(__dirname,'gbk.txt'))
// let test= fs.readFileSync(path.resolve(__dirname,'gbk.txt'),'utf-8') // 这个是自己的测试
// console.log(test);
console.log(r);
r = iconvLite.decode(r,'utf-8')
console.log(r); */


// 转换二进制  当前所在位的值 * 进制 2 的平方根(所在位-1)
// parseInt是将任意进制转换为10进制,第二个参数是告诉函数第一个参数是几进制
// ..toString()是任意进制转换为任意进制  15..toString(16)就是把15转换为16进制
/* console.log(parseInt('11111111',2)); // 将二进制转换为十进制 第一个参数是二进制 第二个参数是告诉他这个是几进制
console.log(255..toString(2)); // 默认js使用.点 调用某个方法的时候,会隐式的包装类型,再调用某个方法
console.log((255).toString(2)); */

// 爬虫
// 1. 爬html => 请求人家html 拿到dom,然后自己分析
// 2. 爬数据 => 访问人家接口然后拿到数据
// 3. 拿资源/图片 无头浏览器 mongo+egg 实现一个爬虫
// 1个字符是ascii  文字用的utf8
// 2进制 = 8bit = 1个字节      1024字节=1k   1024k=1M   1024M=1G



/// base64
// 并不是所有图片都可以转base64:
//     在网络传输过程中,不能传递中文,一般格式化成为base64Url
//     图片可以转换为Base64 
//     只要是可以当成链接的,就可以把base64代表这个文件,所以不用发送请求了
//     一般是小图片转换,大文件不能转换
// base64只是一个编码格式,没有加密的功能
// 不同文件有不同的编码风格
// 一个汉字3个字节 *8 位 转换为=> 4字节*6位 比原内容大三分之一
// 好处: 
// 1. 减少请求
// 缺点: 
// 1. 大文件不能使用,会比原内容大三分之一



'珠'; //  1个汉字 3个字节 24位
/* 
 1. 汉字转16 把3位每个取出
 2. 每位都转成2进制
 3. 2进制劈成4份,每份前面加2个0
 4. 再把这个数字转成2进制 就是一个个的数字
 5. 声明一个字符串 组成是ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
 6. 只要把第四部的数字代入到这个字符串中,就组成了一个base64码 然后用一个base64翻译机器解码下就可以(百度即刻)
*/
let r1 = Buffer.from('珠'); // 变成了16进制 是3个字节
// 汉字转2进制 e7 8f a0
let binary1 = (0xe7).toString(2) // 把16进制的每个字节转换为2进制 0x代表16进制
let binary2 = (0x8f).toString(2) // 把16进制的每个字节转换为2进制
let binary3 = (0xa0).toString(2) // 把16进制的每个字节转换为2进制
let base4= binary1+binary2+binary3 // = 11100111 10001111 10100000
//  base 除以4分 也就是 11100111 10001111 10100000 => 00111001 00111000 00111110 00100000
parseInt('00111001',2) // 57
parseInt('00111000',2) // 56
parseInt('00111110',2) // 62
parseInt('00100000',2) // 32
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str+=str.toLowerCase()
str+='0123456789+/'
console.log(str[57]+str[56]+str[62]+str[32]); // 54+g
// 然后百度个二进制的翻译器 把54+g输入,就是珠峰的珠字

// 二进制表示的小数
// 11.5 乘以2取正法 0.5^-1  每次都乘以2 如果有正数1就记录,不然就记录为0 继续乘以2 直到没有余数