/* 
all
多个异步并发,获取最终结果

*/
Promise.all1 = function (values) {
        return new Promise((resolve, reject) => {
                let resultArr = []
                let orderIndex = 0
                function processResult(value,index){
                        console.log(value,index);
                        resultArr[index] = value
                        if(++orderIndex === values.length){
                                resolve(resultArr)
                        }
                }
                for (let i = 0; i < values.length; i++) {
                        let value = values[i]
                        if (value && typeof value.then == 'function') {
                                // 最重要的是这里调了then的函数,成功就走计数函数. 失败就走外层promise的reject
                                value.then(() => { // 如果成功,则调用技术函数,传入值和索引
                                        processResult(value, i)

                                }, reject) // 如果失败,将返回的promise直接失败
                        } else {// 如果不是promise,也是执行这个函数,只是不从then中获取结果
                                processResult(value, i)

                        }
                }
        })


}
let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
                resolve('ok')
        }, 1000)
})
let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
                resolve('ok')
                // reject('fail')
        }, 2000)
})
Promise.all1([1, 2, 3, p1, p2]).then(data => { //原生=> 所有值都是true以后才能触发then值value到下一个then或者reject(catch)里
        // 按照[]的方式存放data
        console.log(data);
}).catch(err => { console.log(err); })
