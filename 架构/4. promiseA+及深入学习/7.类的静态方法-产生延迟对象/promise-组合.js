
// 需要实现如下效果,就是无限then,但是不传指定成功函数和失败函数  
let fs = require('fs')
let Promise = require('./promise.js')
console.log(Promise);
let read = function (url) {
        let dfd = Promise.defer() // 原型里的静态方法,就是new了个promise
        fs.readFile(url, 'utf8', function (err, data) {
                if (err) {
                        dfd.reject(err) // 调用给的就是promise的reject方法,只是当初放在了dfd身上
                } else {
                        dfd.resolve(data) // 调用给的就是promise的resolve方法,只是当初放在了dfd身上
                }

        })
        return dfd.promise

}
// 地址需要按照层级处理
read('./7.类的静态方法-产生延迟对象/age.txt').then(data => {
        console.log(data);
},err=>{console.log(err);})