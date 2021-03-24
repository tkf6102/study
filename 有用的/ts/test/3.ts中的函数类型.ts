// 函数的类型 对参数进行校验 对返回值进行校验 也可以对函数本身进行校验

function sum (a:number,b?:number,...args:number[]):number{
    return a + (b as number)
}

// 函数的重载: 相当于把类分成两种,不用联和类型
function toArray (value:string):string[]
function toArray(value:number):number[];
function toArray(value:number|string){
    if(typeof value == 'number'){
        return value.toString().split('').map(item=>Number(item))
    }else{
        return value.split('')
    }
}
toArray('123')
export {
    
}