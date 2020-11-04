## 同源策略
协议 域名 端口号 同源
http://www.baidu.com:8080
https://www.baidu.com:8081

## 为什么浏览器不支持跨域
cookie
localStorage
> http协议没有状态,不知道是谁登陆的,网站会给发送一个cookie,标识是谁(sessionId/token). 如果同样情况下,客户访问恶意网站,携带cookie访问. 恶意网站就能获取cookie,然后访问银行网站等,那就很危险.

DOM元素的同源策略
> iframe :在我们的页面迁入别人的页面
我们只要是在同源,才能调用里面的页面. 不然iframe是可以操作页面里的属性的,也就是可以获取账号密码.

ajax也不支持跨域
## 为什么还要跨域
前端在一个服务器地址,后端也在一个服务器地址,通信就是跨域.
- jsonp
    创建一个script标间,把文件引入
- cors 纯后端提供的
- postMessage 两个页面之间的
- document.domain 只是二级域名不同,子域和父域处理
- window.name 
- location.hash sta框架里比较多
- http-proxy (webpack的proxy) 反向代理
- nginx 做一些配置
- websocket 页面间通信,没有跨域问题