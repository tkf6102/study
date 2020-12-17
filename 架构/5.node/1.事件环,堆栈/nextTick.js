/* 
es6的nextTick 
微任务
    1. 是先检测是否有Promise 
        如果有,并且是原生的 
        那就会调动一个Promise.resolve() 
        这个时候就有.then 
        所以是个微任务
    2. mutationObserver 
        没有Promise 并且不是IE(一般是低版本浏览器) 
宏任务
    3. setImmediate        比setTimeOut性能好点 (宏任务,只有IE兼容)
    4. setTimeout          所有浏览器都支持的异步
*/