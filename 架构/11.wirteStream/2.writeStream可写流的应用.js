// 实现功能: 只使用一个字节来实现可写流 超出highWaterMark只是会浪费内存
let fs = require('fs')
let path = require('path')
let ws = fs.createWriteStream(path.resolve(__dirname,'1.copy.txt'),{
    highWaterMark:3
})
let index =0;
function write (){
    let flag = true;
    while(flag&& index<=9){
        flag= ws.write(index+++'')  // 内部是异步,但是有返回值
    }
    if(index>=10){
        ws.end()
    }
}
write()
ws.on('drain',function(){ // 当写入的数据超过预期 (并且把数据全部写入文件后 才会触发)
    console.log('空间被抽干之后,开始写入,再次调用write方法'); // 限制如果为3 输入10个字符 只有3次是因为第四次输入了一个字符,并没有达到空间全部使用完全,所以并不会触发这个事件.
    write()
})
ws.on('close',()=>{
    console.log('close事件');
    // ws.write('ok') //  事件已经end关闭,就不能在写入了 
})
// console.log(__dirname);

// ws的常用方法集合: ws.write ws.end()  ws.on('drain') 如果是文件流,才会有: ws.on('close') ws.on('open')