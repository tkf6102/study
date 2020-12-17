// 生成器是es6的一个api
let likeArray = {
    0: '1',
    1: '2',
    2: '3',
    length: 3
}

function * read(){ // generator 函数是一个es6的api
    // 功能: 碰到yield就会暂停
    yield 1;
    yield 2;
    return '我是最终返回值,不写就是undefined'
}
let iterator = read() // 生成器执行返回的是迭代器
console.log(iterator.next()); // 返回的是value 1 也就是yield返回的值 但是因为后面还有yield 所以 done: false没结束
console.log(iterator.next());// 返回的是value 2 也就是yield返回的值 但是因为后面还有yield 所以 done: false没结束
console.log(iterator.next()); // 返回的'我是最终返回值,不写就是undefined', 因为后面没有yield 所以是true 就是彻底结束了