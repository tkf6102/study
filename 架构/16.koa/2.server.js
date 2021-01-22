// require语法默认查找package.json里的main
// webpack语法默认查找package.json里的module
const Koa = require('./koa源码模拟'); 
// const Koa = require('koa'); 

const app = new Koa();

app.use(ctx=> { // 封装了扩展了ctx
    // 1)ctx每次请求都是创建一个全新的
    // 2)创建多个应用,每次上下文也应该都是新的
    // req就是原生方法
    // request就是封装方法
    // console.log(ctx.req.url);
    // console.log(ctx.request.url);
    // console.log(ctx.url,'---');
    // console.log(ctx.path,'---path---');
    ctx.body = 'hello';
    console.log(ctx.response.body);
    // ctx.body = 'ctx'
})
// 如果是监控多个端口,不希望是同一个人的数据
app.listen(3004, () => {
    console.log('成功回调');
})
app.listen(4000, () => {
    console.log('成功回调');
})
app.on('error',function(a,b,c){ // on方法就是发布订阅 任何地方出错,都可以用onError方法处理
    console.log('server faild');
})


// 看源码
// 1. 自己想怎么实现
// 3. 看别人的怎么实现
// 4. 变成自己的
