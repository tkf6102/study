// 中间件方式
const Koa = require('koa');
const app = new Koa();
const querystring = require('querystring')
app.use(async (ctx, next) => {
    let body = await new Promise((resolve, reject) => {
        let arr = []
        ctx.req.on('data', function (chunk) {
            arr.push(chunk)
        });
        ctx.req.on('end', function () {
            console.log(Buffer.concat(arr));
            resolve(Buffer.concat(arr).toString()) // 监听结束后,会调用promise,然后把全局数据传过去
        });
    })
    ctx.request.body = querystring.parse(body,'&','='); // 第一个是传过去的值,第二个是区分数值之间的值,第三个是字段之间区分的值
    await next()
})
// 实现功能: 登录 判定是否/login 的时候显示一个登录的表单=> 提交数据post/login 然后解析请求头 返回数据
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
const body = (ctx) => {

}
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