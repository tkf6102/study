let express = require('express');  // 引入服务框架
let app = express() // 让他执行
app.get('/user',function(req,res){ // 可以get/post请求
  // req是请求的信息 
  // res是相应回去的信息
  console.log(req);
  res.json({name:'zzf'}) // 响应体里设定一个json格式字符串
})
app.listen(8000,function(){ // 启动localhost:8000/user就可以访问这个数据
  console.log('8000端口号服务已经启动');
})