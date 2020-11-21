const { resolve } = require('../10.promise-all/promise')
let Promise = require('./promise')
// promise.all 
/* 
 1.  就是用一个数组存下所有成功值
 2.  用索引计算成功次数 
 3.  只要索引次数和传入的数组长度相等就可以

 特: 传入的参数只要是自身是个对象,并且自身的.then是个函数 就让他执行
*/
Promise.all3 = function (values) {
    return new Promise((resolve, reject) => {
        let resulteArr = []
        let resultIndex = 0
        let processResule = function (index, value) {
            resulteArr[index] = value
            if (++resultIndex === values.length) {
                resolve(resulteArr)
            }
        }
        for (let i = 0; i < values.length; i++) {
            let value = values[i]
            if ( value  && typeof value.then === 'function') {
                value.then((data) => {
                    processResule(i, value)
                }, reject)
            } else {
                processResule(i, value)
            }

        }
    })
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 500)
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2)
    }, 1000)
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3)
    }, 2000)
})
 Promise.all3([1, 2, p1, p2, p3]).then(data => {
    console.log(data);
}, err => {
    console.log(err);
})
