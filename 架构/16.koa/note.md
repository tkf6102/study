## koa概念
- koa基于node的http模块进行了封装
- 可以基于koa,实现自己的mvc框架(每个人实现mvc的方式不同) 基于koa封装了egg(约定式)
- 原来的http编码的缺陷(koa的ctx扩展了原有方法)
  - 类似于很多很多路径就会很冗余,所以需要一个中间件简化整个项目的逻辑 
    ```javascript
        http.createServe(()=>{
                        if('/aa'){
                            
                        }
                        if('/xxx'){

                        }
                    })

    ```
  - req和res不够强大

    ```javascript
        取路径名需要 
        let {pathname} = url.parse(req.url)
        返回值如果是个对象
        res.end(JSON.strify({}))
    ```
       
- http都是回调方式,不能统一处理错误
  - 使用promise的方式 async+await的方式 可以统一处理错误
  - 中间件机制(每个逻辑都分到中间件中了(use方法))
  - ctx拓展原生的req和res
  - 代码基于es6 特别简洁,express是es5采用回调的方式实现
随笔:
    koa 比较轻量 eggs比较重(很多常用方法都有绑定)
    koa比较常用,适合个人项目







*/