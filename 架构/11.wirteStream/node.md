## promise(必会)
## eventlop(必会)  
- 浏览器事件环
- node事件环(执行体不能错)
## 跨域(必会)

## node
- 全局对象
  - 在global上的全局属性
  - Buffer
    - isBuffer
    - slice
    - alloc(根据长度声明buffer)
    - from(根据字符串来声明buffer)
    - concat 拼接buffer
  - process
    - argv(commander) 参数
    - env(cross-env) 环境
    - cwd() 在哪里运行就在哪里
    - nextTick(微任务异步,在当前栈里结尾处执行)  platform(平台版本信息) 不经常用
  - 内置核心模块
    - fs path 
  - 第三方模块 全局模块的编写
  - commonjs规范实现(必会): 缓存了哪些东西,为什么只是走一次
  - npm基本使用 : 安装 / 发布 / 全局命令 / 局部命令  npm run dev npx 等 
  - 版本号 ~ <= >= 等
  - fs.readFile(文件会都读到内存里) path.resolve path.join extname(文件拓展名) 
    - 根据readFile的缺点: 所有内容读到内存里,所以创建了文件读写流
    - 可读流方式(我们学习的是基于文件读取的,也有http请求的,但是没学呢) 一般是3个常见方法 1. on('data') 2. on('end') 3. on('error') pause resume 前面三个是常见适用于http请求,如果是文件,还需要on('open') on('close')两个事件监听 
- 可写流 (基于文件) write end 方法是可写流
- 