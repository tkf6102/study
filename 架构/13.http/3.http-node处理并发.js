const http = require('http')
const url = require('url')
const server = http.createServer();
server.on('request', function (req, res) {
    // node 主线程是单线程
    // 多个任务访问,就会造成阻塞(异步i/o) 如果有大量的计算,就会导致页面卡死 
    // 子进程
    // if(req.url === '/sum'){ // 异步io 但是因为单线程,大量计算会卡死.这种情况一般都是单独开一个子进程处理,不会用主进程的
    //     let k = 0;
    //     for(let i = 0;i<1000000000;i++){
    //         k+=i;
    //     }
    //     res.end(k+'')
    // }else{
    //     res.end('ok')
    // }

    // 响应体 响应行 头 体
    // 相应行: 状态码
    res.statusCode = 200; // 状态码: 可以瞎写,但是浏览器有可能不认,一般是200
    res.statusMessage = 'ok2'   // 可以给状态码,但是一般不给状态短语
    res.setHeader('qq','ww') // 自定义响应头 来描述响应的结果
    res.end('ok') // 将内容返回给浏览器 如果是直接访问就显示到页面上 如果是通过ajax 就返回到ajax的结果中
})

let port = 3000;
server.listen(port, function () {
    console.log(`server start ${port}`);
})
