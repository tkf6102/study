// webpack是node写的,所以里面的语法都是node语法
const path = require('path'); // 基于node,所以有node语法
module.exports = {
    mode:'development', // 开发模式,默认两种,另外一个是production(production会压缩代码)
    entry:'./src/index.js', // 入口
    output:{ // 出口
        filename:'bundle.js', // 打包后的文件名
        path:path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径,所以使用了node的resolve. 也可以改为path.resolve('dist')是一样的效果
    }
}