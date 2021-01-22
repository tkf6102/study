
 // 语法
 // Object.defineProperty(obj, prop, descriptor)
 // 返回值: 被参数传递给语法的obj对象
 const object1 = {};
 // 第一个参数是对象本体 第二个参数是给对象添加值的名字 第三个参数是添加这个参数的基础设置
 Object.defineProperty(object1, 'property1', {
   value: 42, // 是property1的值
   writable: false // 属性是否只读
 })
 
 object1.property1 = 77; // 因为第三个参数里设置了不可写属性
 // throws an error in strict mode
 
 console.log(object1.property1);
 console.dir(object1)