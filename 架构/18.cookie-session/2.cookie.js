
const http = require('http');
const queryString = require('querystring');
const crypto = require('crypto')
// 加盐算法 和md5一样,不可逆 但是多了一个秘钥
const secret = 'tkfzuishuai'
function sign(val){
    return crypto.createHmac('sha256',secret).update(val).digest('base256')
}

http.createServer(function(req,res){
    res.getCookie = function(val){
        let cookieObj = queryString.parse(req.headers.cookie,'; '); // queryString是按照指定字段切割字符串,默认% = , 对象里需要按照; 来区分
        if(cookieObj.signed){
          let [value,signVal]= val.split('.')
          if(signVal == sign(value)){
              return value
          }else{
              return undefined
          }
        }
        return cookieObj[val] 
    }
    let cookieArr = []
    res.setCookie = function(key,val,opts){
        let optsArr = [];
        if(opts.maxAge){ // 传入也许是大驼峰,但是浏览器识别-
            optsArr.push(`max-age=${opts.maxAge}`)
        }
        if(opts.httpOnly){ // 传入也许是大驼峰,但是浏览器识别-
            optsArr.push(`http-only=${opts.httpOnly}`)
        }
        if(opts.path){ // 传入也许是大驼峰,但是浏览器识别-
            optsArr.push(`path=${opts.path}`)
        }
        if(opts.domain){ // 传入也许是大驼峰,但是浏览器识别-
            optsArr.push(`path=${opts.domain}`)
        }
        if(opts.signed){ // 如果有标记需要处理,就把内容传入val
            val = val + '.' + sign(val);
            console.log(val);
        }
        cookieArr.push(`${key}=` + `${val}` + optsArr.join('; '))
        // res.cookie(val,cookieArr)
        res.setHeader('Set-Cookie',cookieArr)
    }
    if(req.url=== '/write'){
        res.setCookie('name','zf',{signed:true})
        res.setCookie('age','10')
        res.end('write')
    }else if(req.url === '/read'){
        // 读取cookie优化一下代码\
        res.end(res.getCookie('age'))

    }else{
        res.statusCode = 404;
        res.end('Not Found')
    }
}).listen(3000,()=>{console.log('server Start');})