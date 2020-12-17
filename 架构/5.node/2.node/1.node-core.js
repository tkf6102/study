// node可以干什么
// 1. 做后端: node可以让js代码在浏览器环境里运行,他不是一种代码,他是一个运行环境. 有http fs方法
// 2. 做工具: 必备的工具链 gulp webpack vite 写一些常见工具,ssr(优化)
// 3. 中间层: 1)前后端跨域问题 2) 解决数据格式化问题



// Node特点:
    // 1.  非阻塞(我调用了这个API后状态是什么样子呢)
    // 2.  异步I/O(当前方法调用以后,不会立即告诉我结果) 
    // 3.  事件驱动(发布订阅模式)


// Node主线程是单线程
// 阻塞和非阻塞是取决于被调用方 我调用完这个方法后的状态是什么 : 同步阻塞,异步非阻塞

// node宏任务
    // setTimeOut
    // setImmediate
    // fs.readFile
// node 微任务
    // process.nextTick
console.log(process.argv);
console.log(process.env);

console.log(process.cwd());
