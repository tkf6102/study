let Promise = require('./promise')
let promise = new Promise((resolve, reject) => {
    // setTimeout(() => {
    // throw new Error('错误33')
    resolve(3)
    // })
})
promise.then(data=>{
    console.log(data,'data1');
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            // resolve('我是第一个promise异步返回的promise,需要根据我的值来判定下一个函数的返回值') // 这种是直接传入的就是一个普通值
            // 这种是继续传入一个新的promise
            resolve(new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve('继续传入返回值一个新的promise,是需要递归解析的')
                },1000)
            }))
        },1000)
    })
    // return 22
}).then(data=>{
    console.log(data,'data2');
})
/* let promise2 = promise.then(data => { // 新new的promise2
    return promise2 // 成功函数的返回值是promise2
})
promise2.then((data) => {
    console.log(data);
}, err => { console.log(err); }) */

