console.log('myPromise3');
//  promises-aplus-tests promise测试包
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
                    resolvePromise(y,promise2,resolve,reject) 
                    if(called)return 
                    called = true
                }, r => {
                    if(called)return 
                    called = true
                    reject(r)
                })
            } else {
                if(called)return
                called = true
                resolve(x)
            }
        } catch (e) {
            if(called)return
            called = true
            reject(e)
        }
    } else { 
        if(called)return
        called = true
        resolve(x)
    }

}
class Promise {
    constructor(executor) {
        this.state = ENUM.PENDING
        this.value = undefined
        this.resaon = undefined
        this.onResolvedCallBacks = []
        this.onRejectedCallBacks = []
        const resolve = (value) => {
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
    then(onFulfilled, onRejected) {
         // 此处是为了使用.then时刻不传入函数,做的穿透处理 即如果onFulfilled如果不是个函数(也许是个undefined),就设定v=>v(也就是传入什么参数就返回什么参数)
        onFulfilled=   typeof onFulfilled === 'function'? onFulfilled: v=>v
        // 如果.then里不传入失败函数,就向后传递. 最后只要传入失败函数就接受
        onRejected=   typeof onRejected === 'function'? onRejected: err=>{throw err}
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

// 静态方法,就相当于把Promise当做一个对象,给他的defer和defered上放上方法(new一个promise 和他的成功方法都存储上) 
// 产生延迟对象
// 其实就是把一个新new 的promise存放在dfd对象里,存储了三个值 1. promise实例 2. 成功方法resolve 3. 失败方法reject
Promise.defer = Promise.deferred  = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}
module.exports = Promise