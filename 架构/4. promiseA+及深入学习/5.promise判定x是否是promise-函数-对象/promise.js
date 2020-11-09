// 只是做resolve的解析,所有reject是不解析的. 因为失败继续处理,直接返回
console.log('myPromise3');
const ENUM = {
    PENDING: "PENDING",
    ONFULFILLED: "ONFULFILLED",
    ONREJECTED: "ONREJECTED"
}
// 解析这个返回值x的类型,来判定promise2是resolve还是reject
const resolvePromise = (x, promise2, resolve, reject) => {
    // console.log(x, promise2, resolve, reject);
    if (x === promise2) {
        // If promise and x refer to the same object, reject promise with a TypeError as the reason.
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // Otherwise, if x is an object or function,
    if ((typeof x === 'object' && x !== null) || x === 'function') {


        // 这里解析的x,如果是一个别人家的promise的话,人家既调用成功,又调用失败,不管他们,只是使用第一次的值
        // If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
        let called;
        try {
            // Let then be x.then. [3.5]
            let then = x.then
            if (typeof then === 'function') {
                // 如果then是个函数,用call执行他把this指向x,第一个参数是成功回调 第二个函数是失败回调
                // If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
                then.call(x, y => { // 用call的意图是: 复用x.then,不用再次x.then(防止报错)
                    // 只要是测定x.then是个函数 那说明就可以直接执行,并且把成功/失败函数执行且传参. 感觉只是同步,还没处理异步
                    // If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
                    resolvePromise(y,promise2,resolve,reject) // 有可能传入的y还是一个promise,所以还需要调用解析,探测y是对象还是普通值,是函数还报错 直到最后解析出来的返回值作为promise2的结果

                    if(called)return 
                    called = true
                }, r => {
                    // If/when rejectPromise is called with a reason r, reject promise with r.
                    
                    if(called)return 
                    called = true
                    reject(r)
                })
            } else {
                // 如果x不是对象或者函数,也让成功函数接受这个参数
                // If x is not an object or function, fulfill promise with x.
                resolve(x)
            }
        } catch (e) {
            // 如果let then = x.then 失败 就直接将promise做成失败态
            // If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
            if(called)return
            called = true
            reject(e)
        }
    } else { // 只要不是上面的对象/函数,就肯定是普通值
        // 直接把普通值传递到resolve函数执行
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
module.exports = Promise