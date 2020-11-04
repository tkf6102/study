let path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin');
const cleanWebapckPlugin = require('clean-webpack-plugin')
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  devtool:"cheap-module-eval-source-map",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 7777,
    open: true,
    contentBase: 'static',
    hot: true,
    // before:function(app,server){ // before是在请求之前,就直接处理返回一个数据,不用后端配合
    //   app.get('/api/user',function(app,res){ // app部分就是自动识别端口号,自己按照我们传入的路径传入,不会产生跨域
    //     res.json({custom:'111'}) // 这个就是自动返回json格式的字符串了
    //   })
  },
  // proxy:{ // 启动代理
  //   '/api':{ 
  //     target:'http://localhost:8000', // 目标路径,
  //     secure: false, // true就是https false就是http
  //     pathRewrite:{'^/api':''}, // 路径重写
  //     // changeOrigin:true, // 是否把请求的基础路径改成服务器地址 =>有的时候服务器会多识别这一项
  //     // changeOrigin // 也是会把请求头里的路径更改,就是req的数据
  //   }
  // }

  plugins: [ // 插件是实现里面的其他功能,非原生自带的
    new htmlwebpackplugin({
      template: './src/index.html', // 根据依赖的模板插入到这个html里
      filename: 'index.html', // 自动打开的文件是index.html
      hash: true
    }),
    // new AddAssetHtmlCdnWebpackPlugin(), // 这种是cdn的方式,每次都是把cdn传递过来的方法自动添加
    // new webpack.ProvidePlugin({ // 传入一些值可以把所有用到的变量放到每个页面
    //   "$": "jquery" // 只是每个页面都有$,$是当前打包的jquery,并不是全局有,而是每个页面
    // }),
    // new cleanWebapckPlugin()
  ],
  module: { // 解析一个一个模块是在module里 ,比如css文件解析
    rules: [{
        test: /\.json$/,
        use: 'eslint-loader',
        enforce:'pre'
      },
      // {
      //   test: /\.js$/,
      //   use: [{
      //     loader: 'babel-loader' // 可以把css放在页面上
      //   }],
      //   exclude: /node_modules/, // 刨除上传代码
      //   include: path.resolve(__dirname, 'src') // 从哪里选择
      // },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader' // 可以把css放在页面上
          },
          {
            loader: 'css-loader' // 放在后面的先被解析
          }
        ]
      },
      //   {
      //     test: /\.(jpeg|jpg|git)$/,
      //     use: [
      //       {
      //         loader: 'file-loader',
      //         options: {
      //           name:'img/[name].[ext]' // name就是原来文件的名字 .ext是按照原来格式打包
      //         }
      //       }
      //     ]
      // },
      {
        test: /\.(jpeg|jpg|git)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]', // name就是原来文件的名字 .ext是按照原来格式打包
            limit: '100*1024', // 100kb   这里是限制
            publicPath: 'http:www.baidu.com' // 这个就是一个cnd(单独存放图片的服务器),下载图片统一从这里获取
          }
        }]
      },

    ]
  }
}