const Koa = require('koa')
let app = new Koa();

// 请求到来后,会依次执行中间件
// 多个函数会包装秤一个函数执行 [fn1,fn2,fn3] 就会形成 1 3 5 6 4 2 就是递归执行 所谓的洋葱算法
// 所有异步方法,在koa中都要写成promise方法
// 所以的next方法都要加await 或者 return(最好用next,因为return就不继续向下执行了) 强制等待上一个next方法走完才能走后面的 
// 洋葱算法 1)有统一的错误处理方法  2) 方便计算执行时间


// 中间件: 
// 1. 统一处理最先处理一些逻辑 => 在第一个中间件的可以做一些: 比如解析token,然后放到ctx.token = ctx.headers['token'];
// 2. 可以决定是否向下执行next  => 如果没有xxx属性,就不next的方法
// 3. 可以拓展属性和方法 => ctx.xxx= fn? 这块需要确认
app.use(async (ctx,next)=>{
    console.log(1);
await   next(); // next会让下一个中间件执行
    console.log(2);

})
app.use(async (ctx,next)=>{
    console.log(3);
 await   next()
    console.log(4);

})
app.use(async (ctx,next)=>{
    console.log(5);
   await next() // 最后一个中间件执行完就结束了
    console.log(6);

})



app.listen(3000,function(){
    console.log('server Start');
})

// console.time('start');
// console.timeEnd('start');