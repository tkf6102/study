let fs = require('fs');
const Promise = require('./4.状态处理逻辑');



/*  
    1. promise成功和失败的回调 可以传递到外层的下一个then
    2. 如果返回的是普通值,可能还有promise,出错的情况 分别 
        普通值(除了promise/错误,都是普通值,对象也是普通值): 正确/错误的普通值 都会传递到下一次的成功值中 
        不写return 就是return undefined ,就会按照成功态执行
        
        报错: 走到下一then的reject(错误函数)里
        
    3. 错误处理: 如果最近的then没有错误处理函数,会向下查找
    4. 每次执行完promise.then返回的都是新的promise(并不是return this) 所以可以无限then
 
 */
let p1 =new Promise((resolve,reject)=>{
    resolve(100)
})
let p2 = p1.then(data => {
    throw new Error()
},err=>{
    return '失败'
})
p2.then(data=>{
    console.log(data);
},err=>{console.log(err);})