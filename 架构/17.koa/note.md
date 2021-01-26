## 1.static目的
1. public是静态文件的基础目录
2. koa-static是处理静态文件的引入路径,可以执行传入基础路径是哪个路径
   1. 中间件的注册顺序就是优先查找的顺序

```JavaScript
// 会先查找当前路径,如果没有就会查找当前路径的public的路径
app.use(static(__dirname))
app.use(static(path.join(__dirname,'public')))
```


## 2.路由koa-router
npm install @koa/router 代表官方koa下的router
自己写koa-router