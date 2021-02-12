// 记录访问服务器用户的数量 每次访问+1
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
app.keys = ['tkf']; // router会调用本身身上的.keys属性,根据属性自动添加签名; 而且是个数组
router.get('/visit',async function(ctx){
    let visit = ctx.cookies.get('visit',{signed:true}) || 0;
    ctx.cookies.set('visit',++visit,{signed:true})
    ctx.body = `当前是第${visit}次访问`

})
app.use(router.routes())
app.listen(3000,function(){
    console.log('start');
})