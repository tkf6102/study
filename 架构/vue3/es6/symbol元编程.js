// typeof可以判断类型
// 但是symbol可以修改他的类型
let obj = { // 修改他的类型
    [Symbol.toStringTag]:'jw'
}

console.log(Object.prototype.toString.call(obj));



let a = 3.2 |0; // 可以用来取整数值
console.log(a);