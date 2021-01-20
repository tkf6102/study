// node 特点: 创建高性能的web服务  创建服务的方式很简单
// http是node的核心 koa/express/egg/nest.js 都是基于node的http模块封装的

// 1. 浏览器发送请求=> 服务器响应数据
// 整个过程通过传输层处理 tcp协议 

// http是基于tcp协议封装了一些规范(http中的header)   主要学习的是header  http是应用层

// 服务端拿到的请求一般是request  服务端响应结果  response
// 学怎么解析请求来的数据  服务端怎么把数据写给浏览器
// node自带http模块
const http = require('http')
// 服务器 特定的ip地址 端口上监听客户端的请求
const server = http.createServer(); 
server.on('request', function (req, res) { // 和http.createServer是一样的,都是基于发布订阅. 选择一种就可以了
    // 传入的数据肯定是二进制或者必须串
    // req是可读流 是客户端的数据 基于stream模块  on('data') on('end')
    // res是可写流 是服务端返回的数据 write() end()
    // res.write('ok') // 相当于在结束数据里写入ok
    res.end('ok2') // 相当于end 和 write同时使用

    console.log('req');
})

let port =3000;
server.listen(port, function () {
    console.log(`server start ${port}`); // 在3000端口上开启服务
})
server.on('error', function (err) { // 如果发现占用了,我们就会累加重启一个
    if (err.code == 'EADDRINUSE') {
        console.log('in use');
        server.listen(++port)
    }
})

// http的一些插件
// nodemonitor 是node监视器 每次代码保存就会自动重启服务器 不用再每次重启
// npm install nodemon -g 
// nodemon + 文件名来实现  可以配置文件指定文件  

// pm2 是线上用的, nodemon是dev环境   pm2是进程管理