// es6的import/export都是在浏览器,因为node不识别es6
// import 变量提升,在最顶层执行

// 1. 按照接口引出
export let a = 1; // 到处的是一个接口的概念,这样到处一个变量a是可以的

// 2. 不能用的方式
/*
export a; // 直接导出变量a是不可以的,这就不是导出一个接口,而是一个固定值a
let a = 1;  
但是可以按照类简写(不是es6的简写)
export { a }
*/

// 3. * 一次性全部引入
// 相当于把所有值全部引入,并且重命名为obj
// import * as obj from './xxx'

/* 4. 引入自动导出
类库写法,引入以后自动抛出(自己不能用)
export * as obj from './xxx' 
在第一行直接导入,不改变
*/