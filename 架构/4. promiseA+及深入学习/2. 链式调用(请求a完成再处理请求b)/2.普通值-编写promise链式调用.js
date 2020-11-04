/* 
promise就是一个类
1. promise 有三个状态 成功态 resolved 失败态 rejected 等待态(既不成功又不失败)
2. 用户自己定义成功的原因和失败的原因 成功和失败也是用户自己定义的
3. promise默认执行器是自动执行
4. promise的实例都有一个then方法(就是挂载原型) 有两个回调 一个成功 一个失败
5. 如果执行函数时,发生异常,也会执行失败逻辑
6. 一旦promise成功就不能失败,失败也不会变成成功 (只有等待态能改变)
*/
console.log('my1Promise');
const RESOLVE = 'RESOLVE'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
class Promise {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolveCallback = []
        this.onRejectCallback = []
        let resolve = (value) => {
            if (this.state !== PENDING) return
            this.value = value
            this.state = RESOLVE
            this.onResolveCallback.forEach((item) => {
                item()
            })
        }
        let reject = (reason) => {
            if (this.state !== PENDING) return

            this.reason = reason
            this.state = REJECTED
            this.onRejectCallback.forEach((item) => {
                item()
            })
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }
    then(onFufilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => { // 为了可以链式调用(无限.then) 就在每次.then执行以后返回一个新promise

            if (this.state === RESOLVE) {
              let x =   onFufilled(this.value) // 成功值的返回值就直接给到了新promise的成功态中 
                resolve(x)
            }
            if (this.state === REJECTED) {
                onRejected(this.reason)
            }
            if (this.state === PENDING) {
                this.onResolveCallback.push(() => {
                    onFufilled(this.value)
                })
                this.onRejectCallback.push(() => {
                    onRejected(this.reason)

                })
            }

        })
        return promise2

    }
}
module.exports = Promise