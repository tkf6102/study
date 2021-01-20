// 内置模块
const fs = require('fs').promises; // 不再用回调,直接走promise的方式
console.log(fs)
const fs1 = require('fs');
const { createReadStream, readFileSync } = require('fs'); // 继续使用回调
const path = require('path');
const template = readFileSync(path.join(__dirname, 'template3.html'), 'utf8')
const http = require('http');
const url = require('url')
// 第三方模块
const mime = require('mime'); // 可以从浏览器得到返回的文件类型
const ejs = require('ejs'); // 模板引擎
const chalk = require('chalk')
const crypto = require('crypto')
// 服务核心
class Server {
    constructor(options) {
        this.port = options.port;
        this.address = options.address;
        this.directory = options.directory;
        this.fs = fs;
        this.template = template; 
    }
    async handleRequest(req, res) {
        let { pathname } = url.parse(req.url); 
        pathname = decodeURIComponent(pathname)
        let filePath = path.join(this.directory, pathname);
        try { /// 主要是这块报错
            fs1.stat(filePath, (err, fileObj) => {
                if (fileObj.isFile()) { 
                    this.handleFile(filePath, req, res, fileObj)
                } else {
                    console.log(4);
                    let dirs =  fs1.readdirSync(filePath); // 
                    let renderTemplate = await ejs.render(this.template, { dirs }, { async: true }) // 
                    res.end(renderTemplate)
                }
            }); 

        } catch (e) {
            console.log(e);
            console.log('error');
            this.handleError(e, req, res)
        }
    }
    md5(val) {
        return crypto.createHash('md5').update(val).digest('base64')
    }
    cache(filePath, req, res, fileObj) {
        let cTime = fileObj.ctime.toGMTString();
        let md5 = this.md5(fs.readFileSync(filePath)); // 此处是全部文件,可以不用这么写,比较浪费性能
        res.setHeader('Cache-Contral', 'max-age=10')
        res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString())
        res.setHeader('Last-Modified', cTime);
        res.setHeader('Etag', md5)
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
        if (req.headers['if-none-match'] == md5) {
            return false;
        }
        if (req.headers['if-modified-since'] == cTime) {
            return false
        }
        return true;
    }
    handleFile(filePath, req, res, fileObj) {
        // 需要通过header的方式告诉他
        let cache = this.cache(filePath, req, res, fileObj)
        if (!cache) {
            res.statusCode = 304;
            res.end()
        }
        console.log(arguments);
        createReadStream(filePath).pipe(res)

    }
    handleError(e, req, res) {
        res.statusCode = 404;
        res.end('not Foun1d')

    }
    start() {
        const server = http.createServer(this.handleRequest.bind(this)); 
        server.listen(this.port, this.address, () => {
            console.log(chalk.yellow('Starting up http-server, serving ./'));
            console.log(chalk.yellow('Available on:'));
            console.log(chalk.green(`${this.address}:${this.port}`));


        })
    }
}

module.exports = Server;