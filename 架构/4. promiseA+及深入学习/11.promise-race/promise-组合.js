/* 
race
多个异步并发,获取最终结果
会传递到下个then里最先的成功或者失败结果
*/
const fs = require('fs').promises // node的原生版本

/* 

// 最原始使用
Promise.race([1,2,3]).then(data=>{ 
        console.log(data);
}) */
/* let readFs = [
        fs.readFile('./name.txt','utf8'),
        fs.readFile('./age.txt','utf8'),


]
Promise.race(readFs).then(data=>{
        console.log(data);
}).catch(err=>{
        console.log(err);
}) */
Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
                // 一起执行就是for执行
                for (let i = 0; i < promises.length; i++) {
                        let val = promises[i];
                        if (val && typeof val === 'function') {
                                val.then(resolve,reject) // 其实就是把循环出来的promise每个的成功回调和失败回调都做成新new 的promise里的成功回调还是失败回调 
                                // 然后就会相互调用
                        } else {
                                resolve(val)
                        }
                }
        })

}
function wrap(pro) {
        let abort; // 声明一个存储值
        let newP = new Promise((resolve, reject) => {
                abort = reject // 将新new 的promise的失败方法放到reject里
        })
        Promise.abort = abort // 给es6的Promise的方法一个失败方法
        let p = Promise.race([pro, newP]) // 感觉就是返回一个新的promise 但是里面已经得到了race执行以后的返回结果   任何一个成功,就得到成功  任何一个失败,就得到失败
        p.abort = abort
        return p
}
let p = new Promise((resolve, reject) => {
        setTimeout(() => {
                resolve('成功')
        }, 5000)
})
setTimeout(_ => {
        console.log(p, '看下promise的初始promise状态'); // 这个是初始promise,但是没用用处了
}, 6000)
let newPromise = wrap(p)
console.log(newPromise);
setTimeout(() => {
        newPromise.abort('拦截,promise失败')
}, 2000)
newPromise.then(data => {
        console.log(data)
}, err => {
        console.log(err);
})

// 1. 相当于新new一个promise 
// 2. Promise私有属性里放个新promise的reject
// 3. 相当于把原有promise不处理,只是在新promise里看返回结果即刻
