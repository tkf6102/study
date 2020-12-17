var http = require("http")
http.createServer(function(req,res){//回调函数
    console.log(req.httpVersion);
    console.log(req.headers);
    console.log(req.method);
    console.log(req.url);
    console.log(req.trailers);
    console.log(req.complete);
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write("holloe  world")    

res.end("fdsa");
}).listen(8000);
console.log(1)//先执行这个  再执行function中的