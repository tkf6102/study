// 函数方式
const Koa = require('koa');
const app = new Koa();
// 实现功能: 登录 判定是否/login 的时候显示一个登录的表单=> 提交数据post/login 然后解析请求头 返回数据
app.use(async (ctx, next) => {
    if (ctx.method == 'GET' && ctx.url == '/login') { // 如果方法是GET,则返回一个form表单
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
const body = (ctx) => { // 
    return new Promise((resolve, reject) => {
        let arr = []
        ctx.req.on('data', function (chunk) { // 监听请求数据
            arr.push(chunk)
        });
        ctx.req.on('end', function () { // 请求数据全部到达以后
            console.log(Buffer.concat(arr));
            resolve( Buffer.concat(arr).toString())
        });
    })
}
app.use(async(ctx, next) => {
    if (ctx.method == 'POST' && ctx.url == '/login') {
       ctx.body =  await(body(ctx)); // 只要是登录且post请求,就会在body函数这个promise执行结束后获取全部的请求参数
    }
})



app.listen(3000, function () {
    console.log('server start');
})