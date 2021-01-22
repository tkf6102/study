const EventEmiter = require('events')
const path = require('path')
const fs = require('fs')
const http = require('http')

const request = require('./request')
const response = require('./response')
const context = require('./context')
class Application extends EventEmiter {
    constructor() {
        super();
        // 为了多个应用不共享上下文

        // 这三个值每次新建都不是共享的
        this.request = Object.create(request); // 保证每次创造的请求都不是共享的
        this.response = Object.create(response);
        this.context = Object.create(context);

    }
    use(requestCallback) {
        this.requestCallback = requestCallback;
    }
    createContext(req, res) {
        // 为了保证每次请求都创建一个上下文 就不会第一个请求和第二个请求打架
        // 公共属性可以公用,但是私有属性还是自己的
        // 相当于 ctx.__proto__.__proto__ = context  // 每次访问,都基于context创建一个新的上下文
        let ctx = Object.create(this.context);
        let response = Object.create(this.response);
        let request = Object.create(this.request);
        // 此处是把response/request放到ctx里,不然代理的时候,使用this是无法使用的
        ctx.request =request; // 这个是koa的
        ctx.req =  ctx.request.req = req; // 这个是原生的
        ctx.response = response;
        ctx.res = ctx.response.res = res;
        return ctx
    }
    handleServer() { // 创建服务的回调
        // 这里写了个箭头函数是因为创建服务的时候是直接执行,所以this指向有问题 这里用箭头函数把this指向为Application
        return (req, res) => { // 这个req,res是http.createServer创建的时候给的
            // 将req,res都包装给ctx
            let ctx = this.createContext(req, res); // 将req,res传入,返回一个包装的ctx
            this.requestCallback(ctx) // 将ctx传入
        }
    }
    listen(...args) { // 会传入很多方法,所以先存储上
        // http.createServer(this.handleServer.bind(this))
        let server = http.createServer(this.handleServer())
        server.listen(...args)
    }
}
module.exports = Application;


/*
const EventEmiter = require('events')
const path = require('path')
const fs = require('fs')
const http = require('http')
class Application extends EventEmiter {
    constructor() {
        super();
    }
    use(requestCallback) {
        this.requestCallback = requestCallback;
    }
    handleServer() { // 创建服务的回调
        // 这里写了个箭头函数是因为创建服务的时候是直接执行,所以this指向有问题 这里用箭头函数把this指向为Application
        return (req, res) => { // 这个req,res是http.createServer创建的时候给的
            this.requestCallback(req,res)
        }
    }
    listen(...args) { // 会传入很多方法,所以先存储上
        // http.createServer(this.handleServer.bind(this))
        let server = http.createServer(this.handleServer())
        server.listen(...args)
    }
}
module.exports = Application;
*/