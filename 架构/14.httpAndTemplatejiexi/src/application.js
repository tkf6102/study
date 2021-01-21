// 内置模块
const fs = require('fs').promises; // 不再用回调,直接走promise的方式
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
        this.template = template; // 类用到外部变量了,就一定要存储到私有属性上,不然很容易命名冲突和调用时候不匹配
    }
    async handleRequest(req, res) { // this指向问题(http的创建服务改this指针)  解决: 1. return 箭头函数 自动向上查找this 2. bind绑定this
        // 客户端请求我,我根据路径解析 根据解析内容,返回对应的内容 => 这个就叫静态服务
        // 静态服务       
        let { pathname } = url.parse(req.url); // 会把url里的路径解析出来 但是解析的路径是前面带/的,所以使用或者拼接的时候要用path.join方法
        // pathname = encodeURIComponent(pathname); // 这个是加码
        pathname = decodeURIComponent(pathname)
        let filePath = path.join(this.directory, pathname);
        try {
            // console.log(filePath, ',--------------------------------')
            // let fileObj = await fs.stat(filePath); // 这个方法也可以判断文件的存在性
            this.handleFile(filePath, req, res)

            if (11) {
                 // 如果是文件就返回文件
            } else {
                console.log(4);
                // 如果是文件夹,就返回文件目录
                // temp.js就是执行把目录文件获取,然后录入
                let dirs = await fs.readdir(filePath); // 拿到目录
                // 模板里面需要解析和目录相同字段'dirs'值的
                let renderTemplate = await ejs.render(this.template, { dirs }, { async: true }) // 用ejs渲染模板
                res.end(renderTemplate)
            }
        } catch (e) {
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
    gzip(filePath, req, res, fileObj){
        let gzipHead = req.headers['accept-encoding'];
        console.log(gzipHead);
        if(gzipHead.inclouds('gzip')){
            res.setHeader('Content-Encoding','gzip');
            return zlib.createGzip()
        }else{
            return false
        }
    }
    async handleFile(filePath, req, res, fileObj) {
        // node中都是utf-8的,但是浏览器不知道是什么编码
        // 需要通过header的方式告诉他
        // let cache = this.cache(filePath, req, res, fileObj)
        // if (!cache) {
        //     res.statusCode = 304;
        //     res.end()
        // }
        console.log('111111111');
        // 此处设定压缩,如果支持压缩就使用.不然就直接走原来的逻辑
        if (this.gzip(filePath, req, res, fileObj)) {
            createReadStream(filePath).pipe(zlib.createGzip()).pipe(res)
        } else {
            createReadStream(filePath).pipe(res)

        }
        // console.log(arguments);
        // 方式1       
        //  let content = await fs.readFile(filePath); // 读取Buffer码
        // res.end(content) // end可以接受读取的Buffer码并写入页面中 
        // 方式2 // 比方式3好(就是整合了方式3,且边读边写),比方式1更好
        // createReadStream(filePath).pipe(res)
        // 方式3
        // createReadStream(filePath).on('data',function(chunk){
        //     res.write(chunk);
        //     res.end()
        // })
    }
    handleError(e, req, res) {
        res.statusCode = 404;
        res.end('not Foun1d')

    }
    start() {
        // http的createdServer
        const server = http.createServer(this.handleRequest.bind(this)); // 创建实例
        server.listen(this.port, this.address, () => {
            console.log(chalk.yellow('Starting up http-server, serving ./'));
            console.log(chalk.yellow('Available on:'));
            console.log(chalk.green(`${this.address}:${this.port}`));


        })
    }
}

module.exports = Server;