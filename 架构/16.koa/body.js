const querystring = require('querystring'); // 解析字符串转为对象
const bodyParse = function () {
    return async (ctx, next) => {
        let body =await new Promise((resolve, reject) => { // 等待promise成功以后才会赋值给body
            let arr = []
            ctx.req.on('data', function (chunk) {
                arr.push(chunk)
            })
            ctx.req.on('end', function () {
                // 等到结果获取完成才会promise成功
                resolve(querystring.parse(Buffer.concat(arr).toString()))
            });
        });
        ctx.request.body = body; // 获取的值放到ctx.request.body上,后面获取也是这样
        await next()


    }
}
module.exports = bodyParse;