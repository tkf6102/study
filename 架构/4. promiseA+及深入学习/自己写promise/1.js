const ENUM = {
    PENDING: "PENDING",
    ONFULFILLED: "ONFULFILLED",
    ONREJECTED: "ONREJECTED"
}
function resolutionPromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        reject(new TypeError('11 Chaining cycle detected for promise #<Promise>'))
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolutionPromise(y, promise2, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.status = ENUM.PENDING
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallBacks = []
        this.onRejectCallBacks = []
        let resolve = (value) => {
            if (this.status == ENUM.PENDING) {
                this.status = ENUM.ONFULFILLED
                this.value = value
                this.onResolveCallBacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.status == ENUM.PENDING) {
                this.status = ENUM.ONREJECTED
                this.reason = reason
                this.onRejectCallBacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status == ENUM.ONFULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolutionPromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status == ENUM.ONREJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolutionPromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status == ENUM.PENDING) {
                this.onResolveCallBacks.push(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolutionPromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectCallBacks.push(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolutionPromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
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