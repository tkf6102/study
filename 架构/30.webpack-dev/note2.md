## 讲解打包以后的代码
- 是一个自执行函数
- 参数是一个对象,每个路径是key 值是路径,是否挂载,和一个exports的对象


## 如果想修改webpack.config.js名称怎么办
npx webpack 执行的时候选择文件
- npx webpack --config webpack.config.my.js也是可以配置启动的文件


## 如果想修改webpack的启动脚本怎么办?
- package.json里的script里配置
- 设置key-value
```javascript
  "scripts": {
    "build":"webpack --config webpack.config.my.js" // 行间是npx webpack,在package.json里面就按照webpack就可以调用打包命令
  },
```
