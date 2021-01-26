// 个人站: 功能弱 开发人数少 所以才有了现成的mvc框架 egg nest等
// 博客系统:  /user /article
const Koa = require('koa')
const static = require('koa-static');
const app = new Koa();
const path = require('path');
const views = require('koa-views'); // 渲染模板, 之前学过ejs模板了,都大同小异 字符串拼接
const ejs = require('ejs'); // 根据koa-views处理,需要处理ejs页面,所以安装.
app.use(static(__dirname))
app.use(static(path.join(__dirname,'public')))
const routes = require('./routes')

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