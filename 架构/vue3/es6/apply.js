function fn(a,b){
    console.log('fn',a,b);

}
fn.apply = function(){
    console.log('私有applyw');
}

fn.apply()
// 调用函数本身的apply方法,并且让this指向fn 且传值[1,2]
Function.prototype.apply.call(fn,null,[1,2])
// 直接调用fn原型上方法
Reflect.apply(fn,null,[1,2])