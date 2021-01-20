const http = require('http')
const url = require('url')
const server = http.createServer(); 
server.on('request', function (req, res) { 
    // 请求 分为 行 头 体
    // 相应 分为 行 头 体
    // 发请求的工具 
    // curl  => 命令行工具 
                    // 可以手动发送请求
                        // linux才支持
                        // windows下载的时候需要更改git的配置[选择可以cmd黑窗口运行才可以],否则就需要git输入框里
        // 使用: 命令行里 curl -v http://localhost:3000 // 
        /* 
        1. 命令行-v 返回的 请求行:  get方法  协议: http 路径:  localhost:3000
            路径可以传送参数 也就是?后面的query
        */
       // 请求方法: get post put delete 常用请求: get /post 叫做简单请求
       // 复杂请求: put /delete 或者get post自定义(改header,token)header就叫复杂请求
       // restfulApi(不是规范,不用必须遵守)方法   add用post请求 delete删除用户 put 改用户信息   get 获取用户
       // options 请求: 预检请求,有跨域资源时候用, 先发一个预检请求(复杂请求才会发送) => 比如带一个header 就是复杂请求  也可以设置发送时间(但是需要先发送一次)
        // /user post delete get put 路径不变化,但是请求方法改变

    // postman  => 可以可视化操作
    // console.log(req.method); // 方法默认是大写的,需要自己转换
    // console.log(req.url); // 获取请求路径,包含? 但是不包含#后面的 ,也就是端口号/后面的,和#哈希前面的
    let {pathname,query} = url.parse(req.url); // url会把路径解析给我
    console.log(pathname,query);
    console.log(1111);

    // 请求头 就是一个对象
    console.log(req.headers); // keys值node自动转换为小写

    // 请求体
    // socket 包含着请求和相应 我们需要解析他 然后将他放入到一个流中 将数据放入到流中,再去读取这个流
    let arr= [] // 可读流
    req.on('data',(chunk)=>{ // 因为请求体里的数据都是流 流的监控肯定是on('data') 所以就等着这个函数执行就获得了请求体的全部值,然后on('end')里面监听就行
        arr.push(chunk)
    })
    req.on('end',()=>{
        console.log(Buffer.concat(arr).toString());
    })
    res.end('ok2')
})

let port =3000;
server.listen(port, function () {
    console.log(`server start ${port}`); 
})
 



// 问题:    包含着请求和相应 我们需要解析他 创建一个流 将数据放入到流中,再去读取这个流 ,不懂这句话 感觉就是arr = [] 然后解析数据放入数组的过程
 // 请求体
    // socket 包含着请求和相应 我们需要解析他 创建一个流 将数据放入到流中,再去读取这个流