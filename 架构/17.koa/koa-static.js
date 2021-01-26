const fs = require('fs').promises;
const path = require('path');
const { createReadStream } = require('fs');
const mime = require('mime')
function static(dirname) {
    return async (ctx, next) => {
        let filePath = path.join(dirname,ctx.path)
        try {
            // let statObj = await fs.stat('e:\study桌面移动\study\架构\17.koa\public\index.html')
            let statObj = await fs.stat(filePath)
            if (!statObj.isFile()) {
                console.log('文件夹');
                filePath = path.join(filePath + 'index.html');
                await fs.access(filePath);
            };
            ctx.type = mime.getType(filePath) + ';charset=utf-8';
            ctx.body = createReadStream(filePath)
        } catch (e) {
            // 自己处理不了就交给别人
            return next()
        }
    }
}

module.exports = static;