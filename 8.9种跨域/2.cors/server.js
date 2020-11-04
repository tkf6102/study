let express = require('express')
let app = express()

app.use(express.static(__dirname)) // 中间件 => 以当前文件为路径展示在localhost:3000端口
app.listen(3000)