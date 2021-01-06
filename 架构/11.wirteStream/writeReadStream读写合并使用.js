const RS = require('./readStream.js');
const fs = require('fs')
const path = require('path')
const ws = fs.createWriteStream('./write.txt',{
    highWaterMark:1
});
let rs = new RS('./copy.txt',{
    highWaterMark:4
})
rs.pipe(ws) // 1. 异步的 不会阻塞 2. 可以读取一点,写入一点

// 自己实现的,最后组合到pipe里
/* rs.on('data',(data)=>{ // 不停向内存中读取
    console.log(data,'data');
   let flag =  ws.write(data) 
    console.log(flag);
    if(!flag){ // 说明超过写入的预期
        rs.pause()  // 让读取暂停,所以是rs
    }
})
ws.on('drain',()=>{ // 监听写入全都完成,所以是ws
    console.log('drain');
    rs.resume() // 让读取重启,所以是rs
}) */

// 读取流: on('data') on('end')
// 写入流: write() end()
// pipe边读边写 pipe就是管道的意思