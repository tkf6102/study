"use strict";
var _a;
exports.__esModule = true;
var str = 'str';
var num = Number('11');
var num1 = Number('22');
var num2 = Number('33');
var num3 = 33;
// let num4: number = new Number('44'); // 返回的是个实例,所以不能是字符串.可以是Number的实例 可以是Object
var num5 = new Number('55');
var num6 = new Number('66');
var arr = []; // 如果不设定类型就无法给数组传入值
var ar = [];
// ar.push(333)
arr.push(11);
// 
var arr1 = [];
arr1.unshift(true);
console.log(0 /* USER */);
console.log(5 /* ENV */);
var nu = undefined;
var sym1 = Symbol(1);
var sym2 = Symbol(1);
console.log(sym1 == sym2);
var obj = function () { }; // object是表示不是原始类型, 不能str,num,boo 只能func,[],{}    
var o; // 没赋值前就自动是any
o = 1;
var name1 = 'zf';
// name1 = 10 // 初始化是字符串,后面不允许更改
var c = 0; // 联和类型
c = '111';
var w;
w.toFixed(2); // 类型断言,就可以使用类型上的方法
var ee;
ee.toFixed(3);
var w1;
w1; // 尽量不要使用双重断言,这样破坏原有数据结构
var d1 = 'up';
var Ty1 = 'a';
function params(a, b) {
    return a + b;
}
params('1', '2');
var fn = function (a, b) {
    return '111';
};
var fn2 = function (a, b) {
    if (b === void 0) { b = '3'; }
    return a + b;
};
var fn3 = function (a) {
    return a;
};
var fn4 = function (a) {
    if (typeof a === 'string') {
    }
    else if (typeof a === 'number') {
        return '1';
    }
};
var A = /** @class */ (function () {
    function A(a, b, xx) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.xx = xx;
        this.x = a;
        this.y = b;
        this.ww = xx;
    }
    return A;
}());
var a = new A('1', 10, 234234234);
console.log(a);
(function () {
    return '11';
});
var fn1 = function () {
    fn1.count++;
    return fn1.count;
};
fn1.count = 0;
var counter = fn1;
console.log(counter());
console.log(counter());
var strOrNub;
// strOrNub.toLocaleString // 在没确认类型前,只能用共有方法
strOrNub = 123;
strOrNub.toString();
var aaa;
var dom = document.getElementById('app');
// let dom: HTMLElement = document.getElementById('app')! 就表示这个元素是肯定存在,所以不用写null
dom.innerHTML = 'abc'; // 断言(发誓)一定有内容 ,没有问号就可以写成ele&&ele.innerHTML = 'xxx'
// 直接 强转某个类型
dom; // 相当于强制是HTMLElement类型
var c1;
// <boolean>a 原来是string|number 不能断言成为boolean
// c1 as any as boolean // 双重断言 强转可以但是不建议
// !代表断言肯定存在
// ?代表  xx?.ww 代表xx如果存在 才取xx.ww   // 这个链判断运算符 是es7的 是js存在的
(_a = false) !== null && _a !== void 0 ? _a : true; // 如果是null/undefined 就返回后面的,其他都是返回前面的  就是判断null/undefined的
var type = 'a';
// let w :type = 'a'
var arrFn = function (timer, count) {
    var result = [];
    for (var i = 0; i < timer; i++) {
        result.push(count);
    }
    return result;
};
arrFn(3, 2);
