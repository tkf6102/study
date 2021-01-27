// 个人站: 功能弱 开发人数少 所以才有了现成的mvc框架 egg nest等
// 博客系统:  /user /article
const Koa = require('koa')
const static = require('koa-static');
const app = new Koa();
const path = require('path');
const views = require('koa-views'); // 渲染模板, 之前学过ejs模板了,都大同小异 字符串拼接
const ejs = require('ejs'); // 根据koa-views处理,需要处理ejs页面,所以安装.
const koa2Cors = require('koa2-cors'); // koa2处理跨域问题
const routes = require('./routes')

app.use(static(__dirname))
app.use(static(path.join(__dirname,'public')))
app.use(koa2Cors({ // 这里面是可以传一些属性的,自己去看koa2-cors文档
    credentials: true // 跨域是针对浏览器的,后端没有跨域的问题
})); // 中间件执行即刻

// 下面是自己设计头,但是koa-cors就一键设置了
/* app.use(async (ctx,next)=>{ 
    // 1. 跨域头要写对,最好复制
    // 2. 中间件要继续执行await next()

     // 不建议使用* 因为cookie是不支持跨域的 如果想跨域
     ctx.res.setHeader('Access-Control-Allow-Origin',ctx.req.headers.origin);
    // ctx.res.setHeader('Access-Control-Allow-Origin','*'); // 第二个槽需要是指定域名,但是*代表任何域名
    console.log(ctx.req.headers.origin); // 访问源
    ctx.res.setHeader('Access-Control-Max-Age',5) // 设置请求options的过期时间,入参是number类型不是字符串
    ctx.res.setHeader('Access-Control-Allow-Methods','DELETE,PUT') // 设置可以请求的方法,默认是get&post 但是设置以后就可以使用这些方法了
    ctx.res.setHeader('Access-Control-Allow-Credentials',true) // 跨域也是需要后端在响应头里设置,不然前端携带也是报错.

    ctx.res.setHeader('Access-Control-Allow-Headers','auth')
    console.log(new Date().getSeconds());
    console.log(ctx.method);
    if(ctx.method === 'OPTIONS'){ // 如果加了请求头,会发两遍请求,一遍是options获取初始值,这样的话,代码就可以不用向下走
        return ctx.body = ''; // 直接返回空
    }
    await next()
}) */
app.use(views(path.join(__dirname,'views'),{ // 1. 中间件需要use使用 2. 当前目录下查找views的index.js文件
    // 这个方法是ctx上添加了一个方法,ctx.render() 异步的promise,需要使用await
    map:{ 
        ejs:'ejs' // ejs结尾的模板用ejs渲染引擎渲染,所以还需要安装包ejs
    }
}));

app.use(routes()) // 最后导出的也是个函数,所以需要执行. 而且执行可以传参,所以更好点
app.listen(3000,function(){
    console.log('server Start');
})