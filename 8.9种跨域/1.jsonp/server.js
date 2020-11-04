let express = require('express')
let app = express()
app.get('/say',function(req,res){ // 只要是get请求 ,并且是/say路径 就会走这个回调函数
    let {wd,cb} = req.query // 从请求的字段里结构出关键字段
    console.log(wd)
    res.end(`${cb}('我也爱你')`) // 响应数据返回字段
})
app.listen(3000)