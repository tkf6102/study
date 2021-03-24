// 函数类型 
// 函数主要关心返回值和参数

function sum1(a, b): string {

    return a + b
}
sum1('a', 'b')


// 可以通过表达式来定义
//  const sum2:(a:number,b:number)=> number = (a:number,b:number)=>{return a+b} // 这么写函数的类型太长,所以写一个类型别名

// 类型别名
// 把一个函数的入参和返回值指定
type Sum = ((aa: number, bb: number) =>  number) |string
// interface Sum {
//     (a:number,b:number):number
// }

// type 和interface的区别  
    // type仅仅是个别名,参数可以使用联和类型
    // interface是可以拓展
let  sum2: Sum = (a: number, b: number):number =>  a + b 
sum2 = 'hello'