
// 需要实现如下效果,就是无限then,但是不传指定成功函数和失败函数  
let fs = require('fs')
let Promise = require('./promise.js')
console.log(Promise);
let read = function (url) {
        let dfd = Promise.defer() 
        fs.readFile(url, 'utf8', function (err, data) {
                if (err) {
                        dfd.reject(err)
                } else {
                        dfd.resolve(data) 
                }

        })
        return dfd.promise

}
// 地址特意写错,就是为了看catch效果
// read('./age1.txt').then(data => {
//         console.log(data);
// },err=>{console.log(err);}).catch(e=>{
//         console.log(e);
// })

/* promise.resolve是具备等待且解析功能,比如传入的是一个new promise 是会等待他的resolve执行完成 才会执行resolve的
promise.reject不具备等待解析功能 */
/* Promise.resolve('默认成功方法,其实就是每次调用都new 一个新的Promise 然后直接将resolve执行').then(data=>{
        console.log(data);
}) */
Promise.resolve(new Promise((resolve,reject)=>{
        setTimeout(()=>{
                resolve(100)
        },1000)
})).then(data=>{
        console.log(data);
})
/* Promise.reject('默认失败方法,其实就是每次调用都new 一个新的Promise 然后直接将reject执行').then(data=>{
        console.log(data);
},err=>{
        console.log(err);
}) */