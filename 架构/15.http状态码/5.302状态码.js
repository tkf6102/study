const fs = require('fs');
const url = require('url');
const http = require('http');
const path = require('path');
const mime = require('mime')

http.createServer((req, res) => {
    let header = req.headers['user-agent']; // 获取头里的字段,页面里复制的是大写,但是检索需要小写
    console.log(header);
    if(header.match(/iPhone/)){ // 匹配字段里是否有iPone字段
        // 必须 行 头 体 这个规范设置
        res.statusCode = 302; // 如果有,就重定向到302状态码
        res.setHeader('Location','http://www.baidu.com'); // 设定头
        res.end() // 之前页面结束
    }else{
        res.statusCode = 302;
        res.setHeader('Location','http://www.qq.com')
        res.end()
    }
}).listen(3000)