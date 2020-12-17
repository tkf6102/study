/*
 ## 浏览器事件环
微任务/宏任务
每次执行一次所有可执行微任务,然后执行一个宏任务,再查询遍历微任务(微任务执行后,会进行一次GUI渲染)
ui渲染(在宏任务前)/script都是宏任务
dom ui渲染 => 原生是阻塞渲染
           => vue中dom渲染变化了异步渲染

nextTick源码
1. 先typeof Promise用微任务
2. MutationObserver(监控元素变化,异步)
3. setImmediate (ie方法)
4. setTimeout 
*/
/* 进程: 
  就是一个软件
  一个进程可以占用一个cpu
  node可以开子进程,比如爬虫 单开一个线程或者进程去趴数据
线程: 
  软件里的一个线程,只要进程死掉了,就进程卡死了
### 队列/堆栈
队列先进先出(就是一些人排队买票,先排队先买)
堆栈先进后出(往桌面上放书,先放的后拿,只能从上面先拿) */

// 宏任务 微任务

// 异步的方法: 无论微任务还是宏任务 都是等待同步执行完毕以后

// vue2中多次更新数据,只会刷新一次


// 微任务 
/* 
Promise.then        异步最优
MutationObserver    低版本浏览器但是不是IE

*/
// 宏任务
/* 
setImmediate        比setTimeOut性能好点 (宏任务,只有IE兼容)
setTimeout          所有浏览器都支持的异步
click 
ajax
script
ui渲染...宏任务很多
*/


