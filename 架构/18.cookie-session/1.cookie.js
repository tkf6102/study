
const http = require('http');
const queryString = require('querystring');

http.createServer(function(req,res){
    console.log(req.url);
    if(req.url=== '/write'){
        // 每个cookie的值之间都是;空格分开的
        res.setHeader('Set-Cookie',['name=zf; domain=.study.cn; httpOnly=true','age=10; max-age=10; ']) // 如果多次调用Set-Cookie是会被覆盖,所以传多个cookie需要一个数组传值
        // 都是小写的
        // Domain是浏览器控制台里=> Application=> cookie下的值 这个值不能跨域设置,更准确的说,可以设置父子域 可以限制cookie的传送范围 jd有使用 domain=.study.cn
        // 本地hosts文件修改映射表 就可以改动Domain值
        // path代表 路径带/的可以访问 默认是/ 代表本机  这个用的很少,因为比如/write 后面的都需要/write不然无法访问,用起来不方便
        // Expiress max-age cookie有效时间 一个是相对时间 一个绝对时间   max-age=10;
        // http-only 客户端无法通过代码访问cookie httpOnly=true  使用document.cookie获取不到
        // secure 只有https才传送cookie: 表示cookie不容易被盗取
        // same-site 在crsf中使用,防止跨站脚本攻击
        res.end(JSON.stringify(queryString.parse(req.headers.cookie,'; ','=')))
    }else if(req.url === '/read'){
        res.end(req.headers.cookie|| 'empty')
    }else{
        res.statusCode = 404;
        res.end('Not Found')
    }
}).listen(3000,()=>{console.log('server Start');})