const fs = require('fs');
const url = require('url');
const http = require('http');
const path = require('path');
const mime = require('mime');
const crypto = require('crypto');
const md5 = function (value) { // 字符串或 buffer都可以
    return crypto.createHash('md5').update(value).digest('base64')

};
http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);
    let filePath = path.join(__dirname, 'public', pathname);
    res.setHeader('cache-control', 'no-cache');
    fs.stat(filePath, (err, stateObj) => {
        // 判定属性: 
        // 1) 如果内容没有改变,但是修改时间改变了 
        // 2) 1s内变化了n次,这是监控不到的
        // 3) 根据内容对比,不适合大文件(mp3等音视频) 但是好处是精准

        
        let md5Etag = md5(fs.readFileSync(filePath));
        if (md5Etag === req.headers['if-none-match']) {
            res.statusCode = 304;
            res.end()
        }
        if (err) {
            res.statusCode = 404;
            res.end('not Found')
        }
        if (stateObj.isFile()) {
            res.setHeader('Etag',  md5Etag) // 一般不会读取全部内容,只会几行,或者文件大小 或者ctime都可以
            res.setHeader('Content-Type', mime.getType(filePath)) // 设置内容类型
            fs.createReadStream(filePath).pipe(res)
        } else {
            console.log('文件夹');
        }
    })
}).listen(3001)