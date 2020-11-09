/* 
// 本处处理逻辑就是pormise的then返回值成为新的promise2,此处需报一个类型错误 
// 会在promise的resolvePromise函数里处理
// if(x === promise2) 报一个错误
let promise=  new Promise((resolve,reject)=>{
    resolve(1)
})
let promise2  = promise.then(data=>{
    return promise2 // 此为成功态返回的x(一个新new的promise,但是既不成功也不是失败) 但是promise2需要等待这个里面返回的promise的状态才能判定paomise2是成功还是失败 也就是自己等自己成功才能出发成功,自己等自己失败才能触发失败. 永远触发不了
},err=>{
    console.log('fail',err);
})  */


let Promise = require('./promise.js')
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
        return promise2 // 此处是x(也就是resolve/reject的返回值),他返回给resolvePromise函数里,是无法处理的,因为resolvePromise里需要根据x的值判定把新new promise的状态更改,但是此处相当于自己等自己.永远没结果. 详情看resolvePromise里处理
},err=>{
        console.log(err);
})
promise2.then(data=>{
        console.log('success',data);
},err=>{
        console.log('fail',err);
})


