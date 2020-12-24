// Node中生成了一个类 可以创建buffer (设计到node读取,读取出来的文件都是buffer)
// 前端读取文件都是ArrayBuffer binary(二进制) 而Buffer是后端的二进制



// Buffer 常用的方法 isBuffer concat length(字节的长度,汉字3字节) slice(内存) toString() ...

// 创建Buffer的几种方式(内存) 默认内存是不支持扩容的
    // 举例:
    // java生成一个数组,只能放10个,放第十一个就不能放入了
    // 我就在原有的基础上,增加1/2 => 再创建一个15个大小的存放,把以前10个内容拷贝过来.

// 创建Buffer的时候必须指定大小 有索引 有长度(字节的长度)
let buf =Buffer.alloc(5)
buf[1] = 100
buf[6] = 100 // 超出创造时的第五个,就无法创造
// console.log(buf);

// 1. 自动转换为16进制
// 2. 超过255就会自动转换为对数字的256余数 例: 256就是0 257就是1
// 基本用不到
let buf2 = Buffer.from([100,200,255,256,257]) 
// console.log(buf2);

// 通过字符串生成buffer
// buffer长度是字节长度 也就是6个字节(一个汉字3个字节)
let buf3 = Buffer.from('珠峰')
// console.log(buf3);

// 是不是buffer
let buf4 = Buffer.isBuffer(buf3) // 是否是buffer
// console.log(buf4);
// console.log(buf3.length); // 看长度

// magic-string
// 字符串是不能 str[1] = xx 赋值的
// 但是这个包可以 可以下载试试

// 利用buffer 把字符串转成base64
let str = Buffer.from('珠峰').slice(0,3).toString()
let str1 = Buffer.from('54+g','base64').toString()
let str2 = Buffer.from('珠峰').slice(0,3).toString('base64')

// console.log(str);
// console.log(str1);
// console.log(str2);

let bu1 = Buffer.from('珠峰')
let bu2 = Buffer.from('架构')
let big = Buffer.alloc(12)

// copy源码模拟
Buffer.prototype.copy = function(targetBuffer,targetStart, sourceStart=0,endStart=this.length){
    // console.log('myCopy');
    // 第一个是目标复制
    // 第二个是目标的开始点
    // 第三个是本身代码需要开始的点
    // 第四个是本身代码需要结束的点
    for(let i = sourceStart;i<endStart;i++){
        targetBuffer[targetStart++] = this[i]
    }
}
bu1.copy(big,0,0,6) // 把bu1的属性赋值到big(target) 
bu2.copy(big,6,0,6)
// console.log(big.toString());
Buffer.concat = function(bufferList,len = bufferList.reduce((a,b)=> a+b.length,0)){  // 第二个参数就是每次限制取值的量
    console.log('myConcat');
    let buffer = Buffer.alloc(len)
    let offset = 0
    bufferList.forEach((buf)=>{
        buf.copy(buffer,offset) // 每次把buf传入到buffer身上
        offset+=buf.length
    })
    return buffer
}
console.log(Buffer.concat([bu1,bu2]).toString()); // BUffer其实就是用的copy做的



/* 
常用Buffer的功能
fs/ i/o input ouput 读取文件=> 将硬盘文件读取到内存中 读取反而是将硬盘的文件写入到内存中
                    写入文件=> 将内存中的数据拿出来 写入到硬盘中
                    如果文件太大,就会淹没了内存

// 文件中有很多API  都是同步/异步的方法
    程序运行前,使用同步接口(但是有阻塞问题)
    程序开始运行,尽量异步代码
内存泄露: 读取代码分片读取
流的概念: fs.read fs.write
    流(树/链表) => (http一周多) => koa2(原理用法 +eggjs) +mongo +redis=> 做个项目
express源码不讲了 有个视频
*/