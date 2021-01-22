// 属性访问器: 访问某个属性的时候会自动访问这个方法
// 方法1: 直接写在对象里

let ww = 0
let a = {
    ww:1,
    r1:33,
    get qq(){
        console.log(11);
        return 'qq11'
    },
    set qq(val){ // 这个方法就是调用对象的时候,设置对象的ww值为传过来的参数 this
        this.ww = val;
        ww = 999;
    }
}
// a.qq= 100;
// 语法2 这种就是不方便在原生对象上直接get/set方法时候调用的方法 ,就会使用__defineGetter__和__defineSetter__方法
// 特殊点: 
// 1. set方法设置时,不能调用rr方法却继续设置rr方法,这样是无限循环,所以需要设置rr方法,但是改的是r1的值
// 2. val值必须有一个参数
a.__defineGetter__('rr',function(){
    return this.r1
})
a.__defineSetter__('rr',function(val){
    console.log(val,'------');
    this.r1 += val
})

console.log(a.rr);
a.rr = 88;
console.log(a.r1);
