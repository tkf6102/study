console.log('myPromise3');
const ENUM = {
    PENDING: "PENDING",
    ONFULFILLED: "ONFULFILLED",
    ONREJECTED: "ONREJECTED"
}
const resolvePromise = (x, promise2, resolve, reject) => {
    if (x === promise2) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if ((typeof x === 'object' && x !== null) || x === 'function') {
        let called;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    resolvePromise(y, promise2, resolve, reject)
                    if (called) return
                    called = true
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        if (called) return
        called = true
        resolve(x)
    }

}
class Promise {
    static resolve(val) {
        return new Promise((resolve, reject) => {
            resolve(val)
        })
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    constructor(executor) {
        this.state = ENUM.PENDING
        this.value = undefined
        this.resaon = undefined
        this.onResolvedCallBacks = []
        this.onRejectedCallBacks = []
        const resolve = (value) => {
            // PromiseA+规范里无要求如果传入的是一个promise 需要解析他,但是es6自动给处理解析了.所以我们也处理一下
            if (value instanceof Promise) {
                // 如果value是一个promise的实例,那就调用它自己的then方法,把成功函数和失败函数传入
                // 等到再次执行到resolve函数时候,只要不是Promise实例,就会跳过这个函数处理
                // 这是个递归处理
                // reject不具有这个功能
                return value.then(resolve, rejected)
            }
            if (this.state == ENUM.PENDING) {
                this.value = value
                this.state = ENUM.ONFULFILLED
                this.onResolvedCallBacks.forEach(fn => fn())
            }
        }
        const rejected = (resaon) => {
            if (this.state == ENUM.PENDING) {
                this.resaon = resaon
                this.state = ENUM.ONREJECTED
                this.onRejectedCallBacks.forEach(fn => fn())
            }

        }
        try {
            executor(resolve, rejected)
        } catch (error) {
            rejected(error)
        }
    }
    catch(errCallback) { // catch 就是返回一个无成功状态的then
        return this.then(null, errCallback)
    }
    then(onFulfilled, onRejected) {
        // 此处是为了使用.then时刻不传入函数,做的穿透处理 即如果onFulfilled如果不是个函数(也许是个undefined),就设定v=>v(也就是传入什么参数就返回什么参数)
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        // 如果.then里不传入失败函数,就向后传递. 最后只要传入失败函数就接受
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            if (this.state == ENUM.ONFULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                }, 0)

            }
            if (this.state == ENUM.ONREJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.resaon)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                }, 0)

            }
            if (this.state == ENUM.PENDING) {
                this.onResolvedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }

                    }, 0)

                })
                this.onRejectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.resaon)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }

                    }, 0)

                })
            }
        })
        return promise2
    }
}

Promise.prototype.finally = function(callback){
    return this.then(value=>{ // 上一个promise成功还是失败的返回值.感觉是Promise.resolve的返回
        return Promise.resolve(callback()).then(()=>{ // 就是直接调用自己的then方法,用来判定value的值,然后让传入的函数执行
            return value
        })
    },err=>{
        Promise.resolve(callback()).then(()=>{throw err})
    })
}
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}
module.exports = Promise