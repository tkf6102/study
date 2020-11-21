//promise就是一个类

/* 
1. excutor 函数,传入promise的函数自动执行
2. promise 有三个状态 成功态 resolved 失败态 rejected 等待态(既不成功又不失败)
3. 调用resolve成功态 调用reject失败态
4. promise返回的实例 有一个then方法 提供两个回调 对应成功函数和失败函数
5. 如果调用成功和失败 默认走第一次(状态不可逆)
6. 如果执行函数时,发生异常,也会执行失败逻辑
7. 成功时可以传入成功的值,失败时候可以传入失败的值

8. 异步调用resolve/reject也是需要传入值

9. then的链式调用 => {
    1. 如果是普通值就会传递到resolve里
    2. 返回值报错就走reject
    3. 级联调用 也就是return new Promise
}
链式调用是如何执行的
    1. 如果promise的返回结果是普通值(字符串/对象等,只要不是promise实例就是成功),则会传递到下一级then中
    2. 如果失败或者抛错 错误结果会在下一次then的错误函数里接受
    3. 如果返回的是promise, 会用promise的状态作为返回值的结果
    4. 错误处理: 如果代码抛错,会找最近的error处理 比如一个promise有三个then,会把err信息传递给第一个then 如果then没接收,就会给到第二个then 如果第二个接收了,但是没写return 就是默认return undefined 这样就是普通值, 就会走第三个then里的成功回调
*/
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
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}
module.exports = Promise