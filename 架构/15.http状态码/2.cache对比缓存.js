const fs = require('fs');
const url = require('url');
const http = require('http');
const path = require('path');
const mime = require('mime')

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);
    let filePath = path.join(__dirname, 'public', pathname);

    res.setHeader('cache-control', 'no-cache'); // 每次都像服务器发送请求
    fs.stat(filePath, (err, stateObj) => {
        // 如果静态文件没发生变化,直接找之前的文件(缓存)就好了.
        // 根据文件的修改时间判断修改
        // 服务器会给浏览器一个last-modified属性 浏览器下次返回的时候会给一个if-modified-since属性
        let ctime = stateObj.ctime.toGMTString();
        res.setHeader('Last-Modified',ctime)
        let since = req.headers['if-modified-since'];
        if (ctime === since) {
            res.statusCode = 304;
            res.end()
        }

        if (err) {
            res.statusCode = 404;
            res.end('not Found')
        }
        if (stateObj.isFile()) {
            res.setHeader('Content-Type', mime.getType(filePath)) // 设置内容类型
            fs.createReadStream(filePath).pipe(res)
        } else {
            console.log('文件夹');
        }
    })
}).listen(3001)