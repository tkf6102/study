/* 
    目前唯一在redux-saga里使用
    好处: 可以暂停
*/
// generatro 生成器 生成迭代器 iterator
// arguments 是类数组
// 特点: 有长度,有索引 可以遍历(有iterator)

/* let a = {
    0:'1',
    1:'2',
    2:'3',
    length:3
}
// 报错  c is not iterable  c不是迭代器
let c = [...a]
console.log(c);
let d = Array.from(a) // 这个不是使用的迭代器,使用的是循环
console.log(d); */

// symbol 有很多元编程的方法 => 元编程就是可以更改js功能的方法

let likeArray = {
    0: '1',
    1: '2',
    2: '3',
    length: 3
}
likeArray[Symbol.iterator] = function () {
    // 这是一个生成器,生成的是一个迭代器 
    // 迭代器每次都会返回一个对象
    // 对象有个next方法,每次都会自动调用next,调用都是返回一个对象 里面有value done 两个值
    let index = 0

    return {
        next: () => {   // 保证this 所以使用箭头函数 
            console.log(this,'1111');
            console.log(this[index],'222222'); // 其实就是每次从对象里按照索引的位置取值,放到数组里
            console.log(index);
            console.log('0000000000');
            return {
                value: this[index],
                done: index++ === this.length
            }
        }
    }
}
let c = [...likeArray]
console.log(c);