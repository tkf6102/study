
console.log('my1Promise');
const RESOLVE = 'RESOLVE'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
const resolvePromise = (promise2, x, resolve, reject) => {
    console.log(promise2,'第二个promise的值');
}
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
        } catch (err) {
            console.log(err);
            reject(err)
        }

    }
    then(onFufilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => { 

            if (this.state === RESOLVE) {
                let x = onFufilled(this.value) 
                setTimeout(() => {
                    try { // 最重要的就是这个函数和异步 异步是需要等新new的promise执行完以后在让这个函数执行
                        // 函数是根据x的状态来决定将promise2来做成成功态还是reject太
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)

            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }

                }, 0)
            }
            if (this.state === PENDING) {
                this.onResolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFufilled(this.value)

                            resolvePromise(promise2, x, resolve, reject)

                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })
                this.onRejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)

                        resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })
            }

        })
        return promise2

    }
}
module.exports = Promise