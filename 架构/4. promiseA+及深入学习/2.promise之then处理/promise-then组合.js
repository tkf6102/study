/* 
    同一个promise可以then多次 (使用发布订阅)
        考虑: 1.调用then时可能是等待态,我需要将成功和失败的回调分别存放(订阅)
            2. 在resolve的时候,在emit所有对应的成功/失败回调
*/

let Promise = require('./promise-then.js')
let promise = new Promise((resolved, rejected) => {
    setTimeout(() => {
        resolved(1)
        // rejected(2)

    }, 1000)
})
promise.then((data) => {
    console.log('sucess', data);
}, (err) => {
    console.log('faild', err);
})
promise.then((data) => {
    console.log('sucess', data);
}, (err) => {
    console.log('faild', err);
})


