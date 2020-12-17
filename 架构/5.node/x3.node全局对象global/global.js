// global 默认不用声明,就可以直接使用的对象


// 最外层的this被改成了一个对象,但是自执行的this还是global
/* console.log(this);
(function () {
  console.log(this);
})() */

// node的可调用的方法
// console.log(Object.keys(global));
// global里19年还有两个字段 buffer(缓存区,二进制),process(进程阶段,调用自身上的方法)
let globalMy = [
  'global',
  'clearInterval',
  'clearTimeout',
  'setInterval',
  'setTimeout',
  'queueMicrotask',
  'clearImmediate',
  'setImmediate'
]

/* Promise.resolve().then(() => {
  console.log('resolve');
})

process.nextTick(() => {
  console.log(1)
}) */
// console.log(Object.keys(process));
let processMy = [
  'version',
  'versions',
  'arch',
  'platform',
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
// 展示的是当前系统的版本
// console.log(process.platform);
// 展示的是参数列表
/* 固定值:第一个参数   
    node的可执行文件
      第二个参数
    node执行文件的路径
其他的是参数 */
// 在终端中 node 文件名称 参数1 参数2...
// console.log(process.argv);
// console.log(process.argv.slice(2));
// 使用tj的commonder包 可以帮我们实现解析参数的功能
// 安装流程
let program = require('commander')
// 引入以后使用parse属性,把需要把传入的参数传给commander
let obj = program.parse(process.argv) // 根据参数把参数解析成为一个对象
console.log(obj); // 还是用终端打卡,输入 node xxx.js 参数1 参数2... 就会在args这个字段下展示
// on方法 => 1. 追加参数信息 2. 解析参数
program.on('--help',function (){
  console.log('node xxx');
})
// 2. 解析参数
// 配置属性对应的功能 
program.option('-p,--prot <value>','set my port')
// console.log(process.cwd);

// 执行命令
// program.command('create').action(function(){
//   console.log('create Vue')
  
// })

// 版本
// console.log(program.version('1.0.0'));

// 3. env 环境变量
console.log(process.cwd());