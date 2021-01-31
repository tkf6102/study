const { head } = require('../routes/user');
const articleService = require('../service/acticle');
let uuid = require('uuid');
let fs = require('fs')

Buffer.prototype.split = function (sep) {
    let sepLength = sep.length; // 传入截取字符串的长度
    let arr = []; // 备用数组
    let offset = 0; //  每次偏移量
    let currentIndex = 0; // 当前所在索引
    while ((currentIndex = this.indexOf(sep, offset)) !== -1) {
        arr.push(this.slice(offset, currentIndex)); // offset在前是因为每次循环偏移量在这个位置不改变,但是当前值的索引是改变的. 所以从offset开始截取
        offset = currentIndex + sepLength; // 初始值就是当前索引的位置加上我搜索到内容的总长度就是下一次位置的开始点
    }
    return arr
}
// console.log(Buffer.from('珠峰峰').indexOf('峰',4)); // InfoxOf是Buffer的字符串方法,第一个参数是查值,第二个是开始值

class Article {
    async get(ctx, next) {
        // ctx.res.setHeader('Access-Control-Allow-Origin','*')
        let list = await articleService.getList();
        await ctx.render('index.ejs', { list }); // 自动把内容传给body,不用调用body
    }
    async remove(ctx, next) {
        ctx.body = 'article remove'
    }
    async upload(ctx, next) {
        const arr = [];
        ctx.req.on('data', function (chunk) {
            arr.push(chunk)
        })
        ctx.req.on('end', function () {
            let result = Buffer.concat(arr).toString()
            if (ctx.get('content-type').includes('multipart/form-data')) {  // 这个意思是如果请求头中包含这个字段
                // 说明是一个表单 二进制格式
                let boundary = '--' + ctx.get('content-type').split('=')[1]
                let lines = result.split(boundary).slice(1, -1); // 第一个是空值,最后一个是--\r\n换行,所以是掐头去尾
                let obj = {}

                lines.forEach(line => {
                    let [head, body] = line.split('\r\n\r\n'); // 字符串拆开以后是个数组,数组的结构赋值直接给予到head是结构出来的第一个值,body是结构出来的第二个值
                    if (head.includes('filename')) { // 那就是文件
                        // 从(头部长度+\r\n\r\n四个字节)为起始点 结尾点是减去结尾的\r\n两个字节
                        let content = line.slice(Buffer.from(head).length + 4, -2); // 用Buffer转换一下是因为head里面有中文,所以把他先转为二进制再计算字节,不然一个中文是3个字节,是错误的.
                        let filename = uuid.v4(); // 一般上传都是使用新的名字,不然很容易重复的.
                        fs.writeFileSync(filename, content)

                    } else {
                        let key = head.match(/name="(.+?)"/)[1]; // 因为是查找的分组,所以需要[1],不然就是整个整租匹配的值
                        obj[key] = body.toString().slice(0, -2); // 因为是二进制,所以需要转成字符串才能看到 // 因为截取的值有\r\n,所以把后两位的值过滤掉
                    }
                })
                console.log(obj);
            }
        })

        ctx.body = 'article upload'
    }
}
module.exports = new Article()