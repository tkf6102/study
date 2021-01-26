// 第三方插件,用来合并路由的
const koaCombineRouters = require('koa-combine-routers');
const addRouter = require('./article.js')
const removeRouter = require('./user.js')
module.exports = koaCombineRouters(addRouter,removeRouter); // 类似于react 直接合并路由即刻