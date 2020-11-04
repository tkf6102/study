// promise是es6内置
// promiseA+规范 没几行 就是介绍的then 回调的函数等..
/* 
promise就是一个类
1. promise 有三个状态 成功态 resolved 失败态 rejected 等待态(既不成功又不失败)
2. 用户自己定义成功的原因和失败的原因 成功和失败也是用户自己定义的
3. promise默认执行器是自动执行
4. promise的实例都有一个then方法(就是挂载原型) 有两个回调 一个成功 一个失败
5. 如果执行函数时,发生异常,也会执行失败逻辑
6. 一旦promise成功就不能失败,失败也不会变成成功 (只有等待态能改变)
*/
// class Promsie {
//     this.status = 'pending'
// }
// let Promise1 = require('./2.手写promise') // 这个是引入视频写的版本
let Promise1 = require('./2.then处理')
let promise1 = new Promise1((resolved,rejected)=>{
    setTimeout(()=>{
        resolved(1)
    },3000)
    // rejected(1)
})
console.log(promise1);
promise1.then((data)=>{
    console.log('success1',data);
},(err)=>{
    console.log('faild1',err);
})
promise1.then((data)=>{
    console.log('success2',data);
},(err)=>{
    console.log('faild2',err);
})
console.log(promise1);

