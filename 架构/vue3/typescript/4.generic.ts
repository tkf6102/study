// 泛型

function createArray<T>(len:number,value:T):T[]{ // 这个value是个什么类型会根据变量T来判断 ,执行的时候判断下就可以  
    let arr=  []
    for(let i =0;i<len;i++){
        arr.push(value)
    }
    return arr
}
let arr1 = createArray<string>(3,'zf')




// 多个泛型 元祖的交换[string,number]  = [number,string]
// let swap = (tuple:[string,number]):[number,string]=>{
//     return [tuple[1],tuple[0]]
// }
let swap = <T,K>(tuple:[T,K]):[K,T]=>{
    return [tuple[1],tuple[0]]
};
console.log(swap<number,string>([1,'sss']))// 执行的时候也可以不指定类型,会自动推到
