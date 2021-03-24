"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Pointer = /** @class */ (function () {
    function Pointer(b, c) {
        this.b = b;
        this.c = c;
        this.a = 1;
        console.log(this.b);
    }
    return Pointer;
}());
var p = new Pointer(['str'], function () { return '123'; });
console.log(p);
var PointerSon = /** @class */ (function (_super) {
    __extends(PointerSon, _super);
    function PointerSon() {
        var _this = _super.call(this, ['st'], function () { return '12'; }) || this;
        // console.log(this.b) // 直接就会报错
        console.log(_this.c);
        return _this;
    }
    return PointerSon;
}(Pointer));
var a = new PointerSon();
console.log(a);
var name = function () {
};
var ProtectedClass = /** @class */ (function () {
    function ProtectedClass() {
    }
    return ProtectedClass;
}());
var ProtectedClass2 = /** @class */ (function () {
    function ProtectedClass2() {
    }
    return ProtectedClass2;
}());
// const proClas = new ProtectedClass() // 如果constructor前面有procted属性,就是被保护属性,不能new
// const proClas2 = new ProtectedClass2(); // 私有属性包裹以后,不能new 不能继承
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Object.defineProperty(Animal.prototype, "type", {
        get: function () {
            return '属性访问器';
        },
        enumerable: true,
        configurable: true
    });
    Animal.getType = function () {
        return 'es7语法,静态属性';
    };
    Animal.prototype.typeFn = function () {
        return '我只是一个原型上的方法';
    };
    return Animal;
}());
;
var ani = new Animal();
console.log(ani.type);
console.log(Animal.getType());
console.log(ani.typeFn());
