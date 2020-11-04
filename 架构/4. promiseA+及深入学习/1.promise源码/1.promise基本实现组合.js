//promise就是一个类

/* 
1. excutor 函数,传入promise的函数自动执行
2. promise 有三个状态 成功态 resolved 失败态 rejected 等待态(既不成功又不失败)
3. 调用resolve成功态 调用reject失败态
4. promise返回的实例 有一个then方法 提供两个回调 对应成功函数和失败函数
5. 如果调用成功和失败 默认走第一次(状态不可逆)
6. 如果执行函数时,发生异常,也会执行失败逻辑
7. 成功时可以传入成功的值,失败时候可以传入失败的值
*/

let Promise = require('./模拟promise.js')
let promise = new Promise((resolved,rejected)=>{
    resolved(1)

})
promise.then((data)=>{
    console.log('sucess',data);
},(err)=>{
    console.log('faild',err);
})


