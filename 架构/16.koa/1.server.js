// require语法默认查找package.json里的main
// webpack语法默认查找package.json里的module
const Koa = require('./koa源码模拟'); 
// const Koa = require('koa'); 

const app = new Koa();

app.use(ctx=> { // 封装了扩展了ctx
    ctx.body = 'ctx'
})

app.listen(3004, () => {
    console.log('成功回调');
})
app.on('error',function(a,b,c){ // on方法就是发布订阅 任何地方出错,都可以用onError方法处理
    console.log('server faild');
})


// 看源码
// 1. 自己想怎么实现
// 3. 看别人的怎么实现
// 4. 变成自己的
