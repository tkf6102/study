// 插件方式
const Koa = require('koa');
const app = new Koa();
const bodyParse = require('./body.js')
app.use(bodyParse());// 挂载的值会自动解析请求里的数据,等到数据齐全以后,会转成对象返回
app.use(async (ctx, next) => {
    if (ctx.method == 'GET' && ctx.url == '/login') {
        ctx.body = `
        <form action="/login" method="POST">
        <input type="text" name='username' value="111">
        <input type="text" name='password' value="222">
        <button>提交</button>
    </form>
        `
    } else {
        await next(); // 如果不用await,就会直接执行,不等待next(后面的中间件执行完毕)
    }
})
app.use(async (ctx, next) => {
    if (ctx.method == 'POST' && ctx.url == '/login') {
        ctx.body = ctx.request.body; // 在初始化的时候就已经获取了全部的数据
    } else {
        next()
    }
})



app.listen(3000, function () {
    console.log('server start');
})