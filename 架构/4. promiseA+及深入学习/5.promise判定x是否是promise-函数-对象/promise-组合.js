
let Promise = require('./promise.js')
let read = function (url) {
        return new Promise((resolved, rejected) => {
                resolved(100)
                // rejected(100)

        })
}
let promise2 = read().then((data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                        resolve('ok,自己写的promise的级联调用')
                        // reject('ok,自己写的promise的级联调用')
                }, 1000)

        })
}, err => {
        console.log(err);
})
promise2.then(data => {
        console.log('success', data);
}, err => {
        console.log('fail', err);
})


