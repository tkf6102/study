// 静态服务: 客户端发起请求 服务端解析 服务端返回对应结果
const Koa = require('koa')
const app = new Koa();
const static = require('./koa-static');
// const static = require('koa-static');

const path = require('path')
app.use(static(__dirname))
app.use(static(path.join(__dirname,'public')))
app.use(async ctx=>{
    ctx.body = 'hello1'
})

app.listen(3005,function(){
    console.log('server Start');
})