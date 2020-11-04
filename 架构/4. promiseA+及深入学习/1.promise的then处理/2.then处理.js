/* 
promise就是一个类
1. promise 有三个状态 成功态 resolved 失败态 rejected 等待态(既不成功又不失败)
2. 用户自己定义成功的原因和失败的原因 成功和失败也是用户自己定义的
3. promise默认执行器是自动执行
4. promise的实例都有一个then方法(就是挂载原型) 有两个回调 一个成功 一个失败
5. 如果执行函数时,发生异常,也会执行失败逻辑
6. 一旦promise成功就不能失败,失败也不会变成成功 (只有等待态能改变)
*/
console.log('my1Promise');
const RESOLVE = 'RESOLVE'  // 此处存放三个初始化状态
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
class Promise {
    // constructor 其实就是类的constructor指向的自身属性的对象
    constructor(executor){ // 1. 每次声明的值自动传入,也就是new promise时候的传入的函数 2. promise默认执行
        this.state = PENDING
        this.value = undefined // 成功的原因,初始化时刻为默认无
        this.reason = undefined  // 失败的原因
        this.onResolveCallback = [] // 成功的回调函数事件池 .then事件存在异步,所以先存放在自身私有属性里,到指定时间执行
        this.onRejectCallback = [] // 失败的回调函数事件池 .then事件存在异步,所以先存放在自身私有属性里,到指定时间执行
        let resolve = (value)=>{ // value=>这个是成功态以后传给函数回调的参数,也就是resolve(1)的1
            if(this.state!==PENDING)return
            // 1. 这个函数并不是实例上的,所以用let
            // 每次声明promise都会let一个新的
            this.value = value // 调用回调的参数传给自身的成功态的值做修改
            this.state = RESOLVE // 成功以后把自身不可逆的状态修改
            this.onResolveCallback.forEach((item)=>{
                item()
            })
        }
        let reject = (reason)=>{ // reason=>这个是失败态以后传给函数回调的参数,也就是rejected(err)的err
            if(this.state!==PENDING)return
            
            this.reason = reason
            this.state = REJECTED
            this.onRejectCallback.forEach((item)=>{
                item()
            })
        }
        try {
            executor(resolve,reject) // 初始化默认执行
        } catch (error) {
            reject(error) // 所有报错也是执行reject逻辑
        }
        
    }
    then(onFufilled,onRejected){ // 原型上的方法
        if(this.state === RESOLVE){ // 根据私有属性里的值,来判定当前的状态
            onFufilled(this.value) // 把成功属性传入成功回调
        }
        if(this.state === REJECTED){
            onRejected(this.reason)
        }
        if(this.state === PENDING){
            this.onResolveCallback.push(()=>{
                onFufilled(this.value)
            })
            this.onRejectCallback.push(()=>{
                onRejected(this.reason)

            })
        }
    }
}
module.exports = Promise