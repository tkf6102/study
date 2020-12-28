// 流就是读一点 把读出来的写入进去,然后再读取一点 写入一点 
let fs = require('fs')
/* function copy(source,target,cb){
    // 读一点写一点,就是流的概念 fs.read fs.write fs.open fs.close  没写sync 就都是异步的 这几个方法一般用不到,但是是文件流的原理
    fs.readFile(source,(err,data)=>{
        if(err)cb(err);
        fs.writeFile(target,data,cb)
    })
}

copy('./age.txt','./copy.txt',(err)=>{
    if(err)console.log(err);
    console.log('成功');
}) */

function copy(source, target, cb) {
    // 读一点写一点,就是流的概念
    const buffer = Buffer.alloc(3)
    let offsetread =0;
    let  offsetwirte = 0;
    fs.open(source, 'r', (err, rfd) => { // fd file describe(描述) 文件描述符 是个number
        // console.log(rfd,'rfd'); // 文件描述符是个数字
        // 读取其实是将内容写入文件中
        // rfd是文件标识符 
        fs.open(target, 'w', 0o666, (err, wfd) => { // 0o代表八进制 666代表的是不可以执行 可以做别的,0o666可以不写
            // console.log(wfd,'wfd');
            function next() { // 为了解决多数据多次回调写入

                // buffer是每次的空间 参3: buffer的offser偏移量 参4: buffer的length长度 参数5: position位置
                fs.read(rfd, buffer, 0, 3, offsetread, (err, bytesread) => { // void是代表不用返回把
                    // console.log(bytesread,'bytesread'); // 真实读取文件的个数
                    offsetread +=bytesread

                    // 第一个rwx 表示'我'   可以操作文件: 读取 写入 执行
                    // 第一个r-x 表示'所属组'可以操作文件: 读取 --- 执行
                    // 第一个rw- 表示'其他人'可以操作文件: 读取 写入 --
                    // chmod 777 4代表读取 2代表写入 1代表执行 4+2+1=7 如果是777 代表可以其他人也是可以读写执行 如果是766就是自己可以读写执行,别人只能读写
                    // target是path路径,第二个是打开方式 第三个是权限设定 第四个

                    // 写入文件 从buffer的第几个位置 写入几个(bytesread读到几个写几个) 从文件的那个位置开始写
                    fs.write(wfd, buffer, 0, bytesread, offsetwirte, (err, written) => {
                        console.log(written,'written');
                        offsetwirte +=written
                        console.log(written);
                        if(bytesread == 3){ // 如果本次阅读量是3 说明还有文件量可以读取
                            next() // 每次写完都递归写next
                        }else{ // 如果读取量不是3 就说明是最后一次了
                            fs.close(rfd,()=>{})
                            fs.close(wfd,()=>{})
                            cb()
                        }
                    })


                })
            }
            next()
        })


    })
}

copy('./age.txt', './copy.txt', (err) => {
    if (err) console.log(err);
    console.log('成功');
})