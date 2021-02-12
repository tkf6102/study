## webpack 安装
- 安装本地webpack
- npm init -y 形成package.json文件,用于控制webpack打包文件的各种配置
- webpack和webpack-cli-D 因为webpack是开发依赖,所以需要-D
- 会有一个默认配置, npx webpack 会调用webpack命令,自动在当前目录下查找src下的index.js

## webpack功能
- 所有文件基于src文件下,收集全部依赖和文件引入以后,打包成为一个文件.
- 处理兼容文件,原本commonjs规范的引入方法,现在也可以直接在浏览器里使用. 就是webpack帮忙编译的
## webpack可以进行0配置
- 打包工具 => 输出后的结果(js模块) 根据路径等打包成为一个js模块 一般源码都是src里   
  - 初始化执行的时候就是使用的node_modules下的bin 下的webpack.cmd指令

## 手动配置webpack
- 默认配置文件的名字是webpack.config.js