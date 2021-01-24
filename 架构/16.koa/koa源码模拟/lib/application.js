const EventEmiter = require('events')
const path = require('path')
const fs = require('fs')
const http = require('http')
const stream = require('stream')
const request = require('./request')
const response = require('./response');
const context = require('./context')
const { type } = require('os')
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
        ctx.request = request; // 这个是koa的
        ctx.req = ctx.request.req = req; // 这个是原生的
        ctx.response = response;
        ctx.res = ctx.response.res = res;
        return ctx
    }
    handleServer() { // 创建服务的回调
        // 这里写了个箭头函数是因为创建服务的时候是直接执行,所以this指向有问题 这里用箭头函数把this指向为Application
        return (req, res) => { // 这个req,res是http.createServer创建的时候给的
            // 将req,res都包装给ctx
            let ctx = this.createContext(req, res); // 将req,res传入,返回一个包装的ctx
            res.statusCode = 404;
            this.requestCallback(ctx) // 调用了用户的回调方法,将ctx传入,内部会给ctx.body赋值 
            let body = ctx.body; // 将内部赋值取出来
            if (body) {
                // 根据文件类型调整返回对象值
                if (body instanceof stream) { // 测定如果是流的实例
                    body.pipe(res); // 用pipe创造可写流
                } else if (typeof body === 'object') {
                    res.end(JSON.stringify(body))
                } else if (typeof body === 'number') {
                    res.end(body + '')
                }else if(typeof body === 'string' || Buffer.isBuffer(body)){
                    res.end(body)
                }
            } else {
                res.end('Not Found')
            }

        }
    }
    listen(...args) { // 会传入很多方法,所以先存储上
        let server = http.createServer(this.handleServer())
        server.listen(...args)
    }
}
module.exports = Application;
