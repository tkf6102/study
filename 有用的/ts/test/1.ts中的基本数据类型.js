var num1 = 1; // 常用
var num2 = 2; // 2是实例,Number是类 可以用类来描述实例
var num3 = Number(1); // 类返回的是实例,所以也可以直接使用;
var num4 = Number(2); // 类可以描述实例. 向下兼容
var arr = [12, 2]; // 一类类型的集合
var arr1 = [1, '2']; // 联和类型的数组,都可以装入
var arr2 = [true, false]; // 类型集合的另外一种写法
// 元祖: ts中自己实现的 绑定长度 绑定类型
var tuple = ['1', 1]; // 必须按照tuple的类型来传入值
var tss = ['2', 2]; // 名字随意
tuple.push(2); // 可以使用数组的方法
// tss.push(true) // 放入元祖值的时候必须是使用它定义的类型
tss.push(1); // 只要类型可以,元祖就可以使用.
;
console.log(0 /* USER */);
console.log(1 /* 'ADMIN' */);
