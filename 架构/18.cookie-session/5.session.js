// koa默认是不支持session的
// 记录访问服务器用户的数量 每次访问+1
const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session')
const uuid = require('uuid')
const app = new Koa();
const router = new Router();
app.keys = ['tkf']; // 引用的koa-session也是需要app.keys的值的
app.use(session({maxage:10*1000},app)) // 第一个参数是配置,第二个是app(可能需要用到里面的keys等参数把) 可以直接github上搜索koa-session

router.get('/visit',async function(ctx){
    // 其实这里的逻辑和4.session.js是一样的,只不过用的别人封装的
    // console.log(ctx.session.visit); // 只要是挂载了koa-session就会放到ctx.session属性
    // let num = ctx.session.visit || 0;
    // ctx.session.visit = ++num;
   let num =  ctx.session.visit|| 0;
   ctx.session.visit = ++num;
    ctx.body = `当前是第${ctx.session.visit}次`
})

app.use(router.routes())
app.listen(3000,function(){
    console.log('start');
})