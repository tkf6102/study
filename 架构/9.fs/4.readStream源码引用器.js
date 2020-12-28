const readStream = require('./readStream.js')
const rs = new readStream('./age.txt',{
    flags:'r', // 操作文件的标识
    mode:0o666, // 当前模式 666就是权限 可读写不可执行
    autoClose:true, // 文件阅读完成后是否自动关闭 调取fs.close方法
    encoding:null, // 读取的编码 表示的是buffer
    start:0, // 文件读取开始的点  包前包后 也就是0-11是4个字节
    // end:11, // 文件读取结束的点 => 开始到结束的范围 // 如果不写就是到最后
    highWaterMark:2, // 每次读几个 // 默认每次读取是64kb
})
// 可读流: on('data') on('end') pause resume 
const arr = []
rs.on('data',(data)=>{ // 每次读取出来buffer(16进制)都会执行一次这个函数
    arr.push(data)
    // rs.pause() // 可以暂停读取buffer
})
// setTimeout(()=>{
//     rs.resume() // 让读取buffer从新开始
// },1000)
rs.on('end',(data)=>{ // 每次读取完毕都会执行的函数
    console.log(data,'回调参数');
    console.log(arr);
    console.log(Buffer.concat(arr).toString());
})
rs.on('open',fd=>{ // 文件标识符 // 每次文件打开的时候会回调的属性,感觉就像组件的created
    console.log(fd,'open');
})
rs.on('close',()=>{ // 无回调参数  // 每次文件关闭的时候会回调的属性,感觉就像组件的销毁声明周期
    console.log('关闭时刻回调函数');
})
rs.on('error',errorMessage=>{ // 每次文件失败的时候会回调的属性,其实就是try catch
    console.log(errorMessage,'error信息');
})


// fs.readFile('./age.txt',(err,data)=>{
//     console.log(data); // 读出来的是16进制,然后去ascii表里去对照 
// })