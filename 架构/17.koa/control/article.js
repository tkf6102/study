const articleService = require('../service/acticle')

class Article {
    async get(ctx, next) {
        // ctx.res.setHeader('Access-Control-Allow-Origin','*')
        let list = await articleService.getList();
        await ctx.render('index.ejs', { list }); // 自动把内容传给body,不用调用body
    }
    async remove(ctx, next) {
        ctx.body = 'article remove'
    }
}
module.exports = new Article()