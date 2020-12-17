## node事件池
 node10以前和浏览器的机制不一样
setTime和setImmediate行为对比
  在主模块里执行(主要流程):
    setImmediate是当前轮询结束后执行
    setTimeout是受进程性能的影响
  非主模块:
    fileRead回调函数里,就不是主进程

### 总轮询顺序
timer : 定时器
poll : 放i/o操作,如果没有check就会阻塞在这里(等定时器到达时间再停止阻塞),不阻塞就会导致无限循环
check : 轮询后立刻执行,检查是否有可执行的程序

### process(流程)
process.nextTick process实现的微任务,以前是为了取代promise

```
process先执行
Promise.resolve.then(()=>{console.log('resolve)})
process.nextTick(()=>{
    console.log(1)
})
```
node < 10版本
先清空宏任务队列,再清空微任务队列
node > 10
清空一个宏任务队列里的一项,就立刻清空宏任务队列,循环往复

process的值 
let processMy = [
  'version',
  'versions',
  'arch',
  'platform', // 常用
  'release',
  '_rawDebug',
  'moduleLoadList',
  'binding',
  '_linkedBinding',
  '_events',
  '_eventsCount',
  '_maxListeners',
  'domain',
  '_exiting',
  'config',
  'abort',
  'umask',
  'chdir',
  'cwd',
  '_debugProcess',
  '_debugEnd',
  '_startProfilerIdleNotifier',
  '_stopProfilerIdleNotifier',
  'dlopen',
  'uptime',
  '_getActiveRequests',
  '_getActiveHandles',
  'reallyExit',
  '_kill',
  'hrtime',
  'cpuUsage',
  'resourceUsage',
  'memoryUsage',
  'kill',
  'exit',
  'stdout',
  'stderr',
  'stdin',
  'openStdin',
  'allowedNodeEnvironmentFlags',
  'assert',
  'features',
  '_fatalException',
  'setUncaughtExceptionCaptureCallback',
  'hasUncaughtExceptionCaptureCallback',
  'emitWarning',
  'nextTick',
  '_tickCallback',
  'env',
  'title',
  'argv',
  'execArgv',
  'pid',
  'ppid',
  'execPath',
  'debugPort',
  'argv0',
  '_preload_modules',
  'mainModule'
]


### process常用
1) platform(平台)
```
展示的是当前系统的版本
console.log(process.platform);
win32...
``
2) argv 参数列表
固定值:第一个参数   
    node的可执行文件
      第二个参数
    node执行文件的路径
其他的是参数
在终端中 node 文件名称 参数1 参数2...


使用tj的commonder包 可以帮我们实现解析参数的功能
(使用node 百分之30是用别人写好的包)
使用node三个常用网站
npmjs.org.js github node官方api
安装流程
 当前路径,npm install commander (当前路径)
3) cwd 当前工作目录
current working directory(目录)
console.log(process.cwd());
1. cwd是个方法
2. 是依据根目录为标准

4) env
环境变量

插件 cross-env 跨平台环境变量

5)全局就是一个包起来的函数
第一个参数是个对象
第二个参数是require
第三个是module
第四个是路径 本文件路径
第五个好像也是路径 父级路径