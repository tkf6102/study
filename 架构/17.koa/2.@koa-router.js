// 静态服务: 客户端发起请求 服务端解析 服务端返回对应结果
const Koa = require('koa')
const app = new Koa();
const static = require('./koa-static');
const Router  = require('./koa-router');
// const Router  = require('@koa/router');


// MVC model数据 VIEWS视图 control 控制器
const path = require('path')
app.use(static(__dirname))
app.use(static(path.join(__dirname,'public')))

const router = new Router();
router.get('/add',async function(ctx,next){
    ctx.body = 'add1';
    next()
});
router.get('/add',async function(ctx,next){
    ctx.body = 'add2';
    next()
});
router.get('/remove',async function(ctx,next){
    ctx.body = 'remove';
    next()
});
app.use(router.routes())
// app.use(ctx=>{ // 只要是路由没有的,就会走最后的中间件
//     ctx.body = 'hello1'; // 中间件最后是hello1赋值,所以最后页面是hello1,但是一般不这么使用
//     next()
// })





app.listen(3000,function(){
    console.log('server Start');
})


// 个人站: 功能弱 开发人数少 所以才有了现成的mvc框架 egg nest等
// 博客系统:  /user /article