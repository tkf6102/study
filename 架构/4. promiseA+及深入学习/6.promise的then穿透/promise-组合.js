
// 需要实现如下效果,就是无限then,但是不传指定成功函数和失败函数  
let fs = require('fs')
let Promise = require('./promise.js')
 new Promise((resolve,reject)=>{
         reject(3)
         resolve(2)
 }).then().then().then().then(data=>{
        console.log(data);
},err=>{
        console.log(err);
})

