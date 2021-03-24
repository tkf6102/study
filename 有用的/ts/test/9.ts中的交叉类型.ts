interface a {
    handsome: number,
    // a:number
}

interface b {
    handsome: number,
    // a:string
}

type c = a & b; // &是交集,融合所有属性
// 好像是c的handsome就是never,因为有交融,而且两个地方的类型不同,所以是never
let person3: c = {
    handsome: 1,
    // a:1
}

// fn1(1123:never)

type Person4 = c & {
    len: number
};
let xxx: Person4 = { // 交叉类型,可以用来在原有属性上拓展其他属性
    handsome: 1,
    len: 2
}

// 把T和K合并到一个方法上, 但是以后不会这么合并,会主要合并一个属性,不然有可能有never的出现
function mixin<T extends object, K extends object>(o1: T, o2: K): T & K  {
    return {
        ...o1, ...o2
    }
}






































export {

}