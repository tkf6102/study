const ENUM = {
    PENDING: "PENDING",
    ONRESOLVE: 'ONRESOLVE',
    ONREJECTED: "ONREJECTED"
}
function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(y, promise2, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else { // 可能只是个普通对象或者函数
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else { // 普通值
        resolve(x)
    }
}
class Promise {
    constructor(exectour) {
        this.status = ENUM.PENDING
        this.value = undefined
        this.reason = undefined
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        let resolve = (value) => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.ONRESOLVE
                this.value = value
                this.resolveCallbacks.forEach(fn => { fn() })
            }
        }
        let rejected = (reason) => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.ONREJECTED
                this.reason = reason
                this.rejectCallbacks.forEach(fn => { fn() })
            }
        }
        try {
            exectour(resolve, rejected)
        } catch (e) {
            rejected(e)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === ENUM.ONRESOLVE) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === ENUM.ONREJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === ENUM.PENDING) {
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {

                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
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