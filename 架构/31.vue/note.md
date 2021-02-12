## rollup是什么
主要针对于js的模块打包工具,因为只是处理js,所以是针对于js类库打包的工具. 一般是vue或者react等

和webpack的区别是,webpack是可以处理css/html的但是rollup只是针对于js,但是会打包的非常小


## es6转es5语法
- rollup 打包工具
- 用babel/core 是babel的核心模块
- @babel/preset-env 主要是用来转换es6为es5的
- rollup-plugin-babel 把babel和rollup关联起来的插件
- rollup-plugin-serve 在本地用rollup起服务,实现静态服务
- cross-env 环境变量的设置

## 因为使用babel 所以需要有.babelrc文件
## public文件下的index.html是用来测试代码是否正确,本地测试

## package.json
- 如果是写了build:dev  : "rollup -c" 则是代表使用当前配置文件来打包
- 如果是npm run dev: 
  - cross-env ENV=development 代表的是启动cross-env 传一个参数ENV 他的值是development
  - rollup -c -w  启动rollup ,并且使用本地配置文件
    - -c是立即调用文件
    - -w是实时监控,实时打包