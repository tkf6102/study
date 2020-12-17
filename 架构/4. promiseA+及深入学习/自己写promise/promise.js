//promise就是一个类,使用的时候是new 

// 1.executor是一个执行器,默认立即执行. 执行的时候传入resolve,reject两个函数
// 2.默认Promise状态是等待态
// 3.调用resolve会变成成功态,调用reject会变成失败态
// 4. 返回的实例会有个then方法,then中有两个参数,分别是成功对应的函数和失败对应的函数
// 5. 如果同时调用成功和失败,如默认调用第一次的状态
// 6. 抛错throw new Error就走失败逻辑 tryCatch
// 7. 成功有成功value,失败有失败的原因reason



// 8. .then处理异步处理 用发布订阅,写一个事件列表,在then触发时候判定,如果是PENDING状态,就把事件添加到事件列表里. 等到resolve触发时候再循环执行
// 9. then链(解决回调地狱):
// 触发then链时需要注意的一些问题
// 9.1 then返回的是普通值(不是promise),就会到外层的then 的下一个then中的成功函数里接受. 
// 9.1.1 就算是error错误函数返回的如果是普通值也会传到下一个then的成功函数里
// 9.2 可以在then的成功/失败函数中抛出异常,会走到下一个then中的失败函数中
// 特殊: 1. then中需要new 的Promise2 如果是执行同步代码,需要做一个异步(setTimeOut),因为是new Promise2 这个时候把promise2传递给解析函数(resolvePromise)是无法传递的
//       2. 因为是异步,所有try Catch无法捕获exectuor函数直接执行是否正确,所以需要把执行函数用try catch捕获
// 9.3 如果返回的是一个promise,会根据promise的最终结果作为结果返回给下一个then
// 10. 错误处理: 会把错误传递给最近的err函数


// x. onFulfilled 和onRejected  是可传可不传的方法 用穿透 x.then().then().then(data=>{console.log(data)})
/* 
notes:
    1. thenable 就是有then的函数, able是有能力的 thenable就是有then能力的
    2. promise不能返回this的原因: 
        2.1 promise状态不可逆,如果返回的是this,那就一直是原型.
        2.2 每次返回的都是new 的实例,他们的属性是私有的,所以才能达成不可逆. 
        2.3 then方法是共有的
*/
const ENUM = {
    PENDING: "PENDING",
    ONFULFILLED: "ONFULFILLED",
    ONREJECTED: "ONREJECTED"
}
// 这个函数需要兼容他人的promise
function resolutionPromise(x, promise2, resolve, reject) {
    // 如果自己等于自己,那么就报错
    if (x === promise2) {
        /* 
        let promise = new Promise((resolve, reject) => {
            // setTimeout(() => {
            // throw new Error('错误33')
            resolve(3)
            // })
        })
        // then返回的是promise2 然后就直接把这个函数给到了onFullit成功函数,然后他俩就成了同一个函数,这样是不允许的. 因为相当于A等着A去买菜,然后自己去买菜.永远等自己去做一件事
        let promise2 = promise.then(data => { // 新new的promise2
            return promise2 // 成功函数的返回值是promise2
        })
        promise2.then((data) => {
            console.log(data);
        }, err => { console.log(err); })
        */
        reject(new TypeError('11 Chaining cycle detected for promise #<Promise>'))
    }
    // 返回值如果是个对象或者不是函数 则认为有可能是个promise
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called; // 如果解析x是一个别人家的promise 他的then里的成功和失败如果被同时调用,就要忽略掉其他值,只是留存第一次的then方法里的成功/失败值 不能两个函数都用

        // 二次判断是否有then
        try { // 2.3.3.2 如果取值x.then报错,就reject(e)
            /* 
                let obj = {}
                Object.defineProperty(obj,'then',{
                    get(){ // 取值就报错,一般是Object.defineProperty的get
                        throw new Error('取值then就出错')
                    }
                })
                obj.then
            */
            let then = x.then
            if (typeof then === 'function') {// 三次判断,如果then也是个函数,就是promise
                // 用then.call的意思复用then 也是防止x.then,也就是再次取then方法,因为也许再次取值就会报错,所以用的call执行 然后把参数传入进去
                // 让then 的this指向x,是因为x肯定是promise.then x代表的即是返回值,又是promise这个本体 而且如果直接执行then,不指定this 那then函数里的this指向就会有问题
                then.call(x, y => { // y是第一个成功回调的参数
                    if (called) return // 成功函数或者失败函数只能调用一次,多余次数就自动忽略他们
                    called = true


                    // 这里的y可能也是一个promise,所以还是使用resolvePromise递归解析
                    resolutionPromise(y, promise2, resolve, reject) // 传入的promise2还是只是等待y的结果就把第一个then 的结果返回 然后终归会解析到普通值或者报错就结束

                    // resolve(y) // 简化版: 其实就是下一个成功函数onFuli被执行,就会把y传进来,这样就让resolve执行
                }, r => { // r是失败回调的参数
                    if (called) return  // 成功函数或者失败函数只能调用一次,多余次数就自动忽略他们
                    called = true

                    reject(r) // 这两个箭头函数,1. 为了切片变成,可以传参 2. 只是then执行以后的第一个和第二个函数位置. 如果还不明白可以直接按照then函数理解,但是不能按照then函数执行,因为then函数里面有this,不用call执行this指向会有问题
                    // 递归解析不用reject,因为有一个错误就直接reject
                })
                // 测试call这里,需要第一个then有返回值!!!

                // then(y=>{ // 错误版本!! 这个就是简化版,不用call,但是then方法里有this,不用call执行this是错误的
                //     resolve(y)// 等待成功函数执行,就会调用这个promise2的resolve 就可以把外层then也变为成功状态
                // },r=>{
                //     reject(r)
                // })

            } else { // 如果检测then不是函数(也就是可能只是个对象,或者普通函数,不是promise),就直接把当前值传给下个then的成功函数

                resolve(x)
            }
        } catch (e) {
            if (called) return  // 成功函数或者失败函数只能调用一次,多余次数就自动忽略他们
            called = true
            reject(e)
        }

    } else {
        // 普通值,就直接作为成功promise的value
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
    then(onFulfilled, onRejected) { // 2.2.4 有说明,说这两个函数必须是异步执行,也就是当前事件环执行完毕之后
        // 这个是做穿透,因为这两个onFulfilled, onRejected函数参数都是可不必填,如果下层then想要,需要把传入的值先return ,后面的x自然就成了前面return的值,后面每一次都可以接受前面传来的值
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status == ENUM.ONFULFILLED) { // 因为会根据用户传入的函数返回值判定
                setTimeout(() => { // 下面事件池里不用等Promise2 是因为只有异步代码才会进入事件池,也就默认自带异步/serTimeout
                    try { // 是因为初始化executor函数,有可能报错,但是这里为了promise2实例化完成且拥有promise2,所以改了异步以后的捕获没法捕获,所以特意设立trycatch
                        let x = onFulfilled(this.value)
                        // 解析x的值是普通值还是promise
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
                    setTimeout(() => {

                        try {
                            let x = onFulfilled(this.value)
                            resolutionPromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)


                })
                this.onRejectCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolutionPromise(x, promise2, resolve, reject)
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