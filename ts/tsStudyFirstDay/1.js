"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let num:number = 12;
// let bool :boolean = true;
var ary = ['1', 1, 23, 4, '2'];
var ary2 = ['1', 1]; // 此处是固定的顺序
var ar3 = ['123'];
var ary4 = {
    a: 1,
    b: 3
};
var qq;
(function (qq) {
    qq[qq["success"] = 1] = "success";
    qq[qq["fail"] = 2] = "fail";
    qq[qq["upload"] = 3] = "upload";
})(qq || (qq = {}));
;
var str1 = qq.success;
function voidFn() {
    return undefined; // 只能返回undefined 除此之外不能返回其他
}
var obj = {};
function func(x) {
    if (typeof x === 'number') {
    }
    else {
        console.log(x);
    }
}
func(1);
