const fs = require('fs');
const url = require('url');
const http = require('http');
const path = require('path');
const mime = require('mime')

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url); // 这里面有很多请求的参数,只需要用pathname是参数路径
    let filePath = path.join(__dirname, 'public', pathname);

    // cache-control: no-store 
        // 每次都请求服务器,服务器返回的数据根本不缓存(理解起来每次都走数据库)
        // 服务器会告知: 找缓存,但是因为根本不存储缓存,所以报错
    // cache-control: no-cache 
        // 每次都请求服务器,走缓存(理解起来就不要看no,或者把no理解为标识符,不是字面意思)

    // 强制缓存  强制缓存的状态码还是200
    // memory cache disk cache就是从缓存里找的样式表 浏览器会根据使用次数文件类型自动去存储到缓存还是硬盘里 
    res.setHeader('cache-control', 'max-age=10') // 设置缓存头,10秒内不再重新请求css/image/js 
    res.setHeader('expires', new Date(Date.now() + 10 * 1000).toGMTString()) // 低版本浏览器的写法
    fs.stat(filePath, (err, stateObj) => {
        if (err) {
            res.statusCode = 404;
            res.end('not Found')
        }
        if (stateObj.isFile()) {
            // 会有个favicon.ico的报错,是自动在根目录下查找这个ico 其实就是浏览器的图标 
            res.setHeader('Content-Type', mime.getType(filePath)) // 设置内容类型



            fs.createReadStream(filePath).pipe(res) // 如果是文件,则读取文件内容后. 用pipe方法, pipe方法是把读取内容按照边读边写的方式录入以后自动调取回调
        } else {
            console.log('文件夹');
        }
    })
}).listen(3001)