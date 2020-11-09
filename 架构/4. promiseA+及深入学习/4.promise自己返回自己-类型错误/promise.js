console.log('myPromise2');
const ENUM = {
    PENDING: "PENDING",
    ONFULFILLED: "ONFULFILLED",
    ONREJECTED: "ONREJECTED"
}
// 解析这个返回值x的类型,来判定promise2是resolve还是reject
const resolvePromise = (x, promise2, resolve, reject) => {
    // console.log(x, promise2, resolve, reject);
    if(x === promise2){
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
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
        // 每次then的时候都返回一个新的promise 所以需要new一个值
        // 每次then直接创造一个新的promise返回(以前是每次都只是处理结果,现在是创建一个新的promise2,在promise2里处理原有结果.并且根据返回值x来判定新new的promise2的resolve执行还是reject执行)
        let promise2 = new Promise((resolve, reject) => { // 此处new 自己
            if (this.state == ENUM.ONFULFILLED) {
                // 成功回调(onFullfiled)或者失败回调(onRejected)不能在当前context中执行,所以用定时器(异步)处理
                setTimeout(() => {
                    try { // try catch外层直接执行的时候无法处理到异步的地方
                        let x = onFulfilled(this.value) // 根据每次成功方法的返回值来控制下一次promise的进度
                        // 解析这个返回值x的类型,来判定promise2是resolve还是reject
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
      
                },0)

            }
            if (this.state == ENUM.ONREJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.resaon)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
     
                },0)

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
     
                    },0)

                })
                this.onRejectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.resaon)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
  
                    },0)

                })
            }
        })
        return promise2
    }
}
module.exports = Promise