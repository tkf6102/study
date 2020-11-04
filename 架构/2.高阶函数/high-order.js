// 什么是高阶函数:
// 1. 如果一个函数的参数是一个函数,他就是一个高阶函数(回调函数就是一种高阶函数)
// 2. 如果一个函数返回一个函数,也是一个高阶函数

// 高阶函数的应用场景

// 举例: 写了一个业务代码,需要拓展业务

function say1(){
    console.log('say1');
}
Function.prototype.before = function(callback){
    console.log(this);
    let that = this; // 如果return是function函数,那就是用that 但是箭头函数是所在作用域,也就是上级查找
    return ()=>{ // 箭头函数的this是声明时所在作用域的this 其实就是上级
        callback()
        this(); 
    }
}
let beforesay = say1.before(function(){
    console.log('before say');
})
beforesay()