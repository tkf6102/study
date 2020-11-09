/* 
写前思考: 
        1. then链是如何判定返回的是promise
        
*/
/* 
  链式调用是如何执行的
        1. 如果promise的返回结果是普通值(字符串/对象等,只要不是promise实例就是成功),则会传递到下一级then中
        2. 如果失败或者抛错 错误结果会在下一次then的错误函数里接受
        3. 如果返回的是promise, 会用promise的状态作为返回值的结果
        4. 错误处理: 如果代码抛错,会找最近的error处理 比如一个promise有三个then,会把err信息传递给第一个then 如果then没接收,就会给到第二个then 如果第二个接收了,但是没写return 就是默认return undefined 这样就是普通值, 就会走第三个then里的成功回调
*/


let Promise = require('./promise-then链式调用.js')
let fs = require('fs')
let read = function(url){
        return new Promise((resolved,rejected)=>{
                // throw new Error('错误1')
                // rejected(100)
                resolved(100)
                // fs.readFile(url,'utf8',function(err,data){
                //         if(err){
                //                 rejected(err)
                //         }
                //         resolved(data)
                // })
        })
}
let promise2= read().then((data)=>{
        console.log(data);
        return '123'
},err=>{
        console.log(err);
})
promise2.then(data=>{
        console.log('success',data);
},err=>{
        console.log('fail',err);
})
