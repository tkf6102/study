function name<T, K>(params: T, str: K): void {
    // 泛型可以多个参数,根据参数不同会自动调整.如果不传会自动推导   
}

name<string, string>(1, 'a')


interface Iss<K> {
    <T>(name: T): K; // T是调用函数时传入的参数,K是接口执行时传入的参数
}
let ss: Iss<string> = () => {
    return 'sws'
};
ss<number>(1)

// extends强调属性

type withLength = {
    length: number
};
let fn1 = <T extends withLength, K extends withLength>(a: T, b: K): number => {
    // return a + b // 因为类型不确认,所以不能直接返回
    return 1
}
fn1('123', { length: 3 })
let fn2 = <T>() => { // 函数的接口在形参前面

}

class Public<K, T = number>{
    private age: T[] = []
    constructor(public name: K) {

    }
}

type T2 = keyof string // 取当前字段的所有key值为类型
type T1 = keyof {string:1}


let a:T1 = 'string';

let  ii  =  {
    name:1,
    age:2
}

type T3 = typeof ii; // 读取值的类型

let a111 :T3 = {
    name:2,
    age:3
}

type aws = keyof {
    name:1,
    age:2
}


interface Ass<T = number>{
    name:T
}
type Adsfsw =  Ass<number>
























export {

}