const fs = require('fs')
const util = require('util') // node原生方法,所以不用单独安装


/*
// promisify promise化 把一个nodeAPI转换成node写法
let read = util.promisify(fs.readFile) // util是node原生方法, 他身上有个promise化的方法,可以将fs.readFile改变成promise的方式,然后就可以把原有回调改为.then里的回调了
// read函数执行完才能.then 就说明是个高阶函数,函数执行完返回是个promise
read('./11.promise-其他方法(promise完结)/age.txt', 'utf8').then(data => { console.log(data); }, err => { console.log(err); })
*/


/* // 按照姜老师写
const promisify = function(fn){ // 这个是每次传入的函数
    return (...args)=>{ // 这里会传入很多参数(原本读取文件函数也是接受很多参数)
        return new Promise((resolve,reject)=>{
            fn(...args,function(err,data){
                if(err)reject;
                resolve(data)
            })
        })
    }
}
let read = promisify(fs.readFile);
read('./11.promise-其他方法(promise完结)/age.txt','utf8').then(data=>{
    console.log(data);
}) */


/* // bluebird 第三方模块 别人写的 需要安装
const bluebird = require('bluebird') 
const fsAsync = bluebird.promisifyAll(fs)// 其实他的实现就是把fs的所有方法都传入,然后给名字添加一个sync
// console.log(fs);
// console.log(fsAsync); */

// 姜老师实现bluebird的promise化All
const promisify = function(fn){ // 这个是每次传入的函数
    return (...args)=>{ // 这里会传入很多参数(原本读取文件函数也是接受很多参数)
        return new Promise((resolve,reject)=>{
            fn(...args,function(err,data){
                if(err)reject;
                resolve(data)
            })
        })
    }
}
let promisifyAll = function(fns){
    Reflect.ownKeys(fns).forEach((key)=>{
        if(typeof fns[key] == 'function'){
            fns[key+'Async'] = promisify(fns[key])
        }
        
    })
    return fns
}
const newFs = promisifyAll(fs)
console.log(newFs);

/* 
    1. promisify是对原有函数进行包装
    2. promisifyAll是对所有函数调用promisify进行循环集体包装
    3. 只能在node里使用
    4. 用
*/