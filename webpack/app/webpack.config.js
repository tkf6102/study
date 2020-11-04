const path = require('path') // 因为出口文件的路径需要是绝对路径,所以是导入nodejs的文件读取功能
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin') // 这个是每次打包都会去处理dist文件下的文件
const htmlWebpackPlugin = require('html-webpack-plugin')
// console.log(__dirname,"path");
module.exports = { // 遵循Commonjs规范


  entry: './src/index.js', // 这个是入口文件,自己写什么都可以,单个文件 .也可以把公共的工具打包成为一个入口文件,就是多入口文件
  output: { // 出口文件
    // fileName:'bound.js', // 文件名称
    // hash chunkHash 入口文件的hash  contentHash是内容hash值
    // filename: 'bundle.[contentHash:8].js', // 文件名称 防止走缓存,每次加一个hash值作为文件名字
    filename: 'bundle.js', // 文件名称 防止走缓存,每次加一个hash值作为文件名字
    path: path.resolve(__dirname, "dist") // 用path.resolve()就可以把路径解析成为一个绝对路径
    // __dirname是Commonjs全局自带的一个值,就是当期文件所在的目录
    // dist是输出的文件
  },

  // entry:{ // 多个入口文件,把两个js文件放到dist下,并且都集成到html上
  //   index:'./src/index2.js',
  //   other:'./src/other.js'
  // },
  // output: { 
  //   filename: '[name].js',  // 代表上面的index2或者other 也就是一个变量name
  //   path: path.resolve(__dirname, "dist") // 路径不变
  // },


  devServer: {
    // 开启本地服务 可自行更新,启动并刷新页面  
    // 这是本地服务,需要启动,在package.json里的script手动启动  
    // 所有package.json里的script都是执行node_modules下的bin的cmd代码  
    // 在内存中打包,所有目录在根目录下
    // !! 根目录就是app这个目录,static静态文件其实就是直接寄存在根目录下 端口号7777/a.html的7777/就是根目录
    port: 7777, // 本地端口号
    open: true, // 是否自动打开浏览器
    compress: true, // 是否自动压缩代码,但是我们还是会安装插件
    contentBase: 'static', // 启动一个静态资源文件
    hot: true // 热更新 ,加上这个属性,就是页面刷新是实时的
  },
  plugins: [ // 这里存放的是webpack的插件
    // new webpack.hotModuleReplacementPlugin(), // css插件热更新
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns:['cc/*','!cc/a.js'] // 清除cc/所有文件 !但是不包含cc/a.js文件
    // })
    new CleanWebpackPlugin(), // 每个插件使用都需要new一下 这个插件功能是每次都把dist文件下的文件删除,并且把新打包的文件传入dist
    new htmlWebpackPlugin({
      template: './index.html', // w这个是模板文件,每次打包好的js会自动引入到这个html里
      filename: 'index.html', // 打包以后文件的名称,一般不会做更改还是叫index.html
      hash: true // 就是自动在output的filename上自动加上hash值,不用再filenmae里面写了
    })
    // 多个html打包
    // new htmlWebpackPlugin({
    //   template:'./index.html', // w这个是模板文件,每次打包好的js会自动引入到这个html里
    //   filename:'index.html', // 打包以后文件的名称,一般不会做更改还是叫index.html
    //   hash:true, // 就是自动在output的filename上自动加上hash值,不用再filenmae里面写了
    //   chunks:'index'
    // }),
    // new htmlWebpackPlugin({
    //   template:'./other.html', // w这个是模板文件,每次打包好的js会自动引入到这个html里
    //   filename:'other.html', // 打包以后文件的名称,一般不会做更改还是叫index.html
    //   hash:true, // 就是自动在output的filename上自动加上hash值,不用再filenmae里面写了
    //   chunks:'other'
    // })
  ],
  module: {
    rules: [{
        test: '/\.style$/', // 需要写成正则
        use: 'style-loader'
      },
      // { // 这个路径是从下往上或者从右往左加载的,需要把css转成style 所以把css需要写在下面 
      //   test: '\.css',
      //   use: 'css-loader',
      //   enforce: 'post' // post是后加载,pre是优先加载.因为顺序必须固定,所以写这个属性控制
      // }
      { // 这个路径是从下往上或者从右往左加载的,需要把css转成style 所以把css需要写在下面 
        test: '/\.css$/',
        use: ['style-loader','css-loader'], // 因为是从右往左,所以css在右边
        enforce: 'post' // post是后加载,pre是优先加载.因为顺序必须固定,所以写这个属性控制
      },
      {
        test:'/\.less$/',
        use:['style-laoder','css-loader','less-loader']
      },
      {
        test:'/\.css/',
        use:['style-loader',{
          importLoaders:1, // 如果是在一个css里面引入了less,就不会执行不并引入.所以单独在use的时候加载这个属性 他会用后面的第一个加载器来解析页面里面的其他文件 
        },'less-loader']
      }
    ]
  }
}