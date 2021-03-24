function fn (a:number|string){
    if(typeof a == 'number'){ // 根据类型来判定使用的值
        a.toFixed()
    }else{
        a.
    }
}

class Person {
    eat(){}
}
class Dog{
    
};
function  createClass(clazz:new ()=>Person | Dog) {
    if(clazz instanceof Person){ // 根据实例判断,如果是实例,就使用实例方法
        clazz.eat()
    }else{
        clazz // 
    }
}

// in语法
interface Fish {
    swiming: string
}
interface Bird {
    fly: string
}
function  isBird(animal: Bird | Fish):animal is Bird { // ts语法 返回值里判定是否是Bird类型
    return 'swiming' in animal; // in 语法,判定是否在这个接口里 js语法
}

function  xx (animal:Bird|Fish) {
    if(isBird(animal)){
        
    }
}

interface xxx1 {
    a:string,
    b:string,
    c:'ss'
}
interface xxx2{
    a:string,
    b:number,
    c:'xx'
}
function ssw(par:xxx1|xxx2) {
    if(par.c === 'xx'){
        // todo...
    }else if(par.c == 'ss'){
        //  todo..
    }
}

function isString(p:any):p is string { // 只要是用了is,强制返回值是布尔值
    return true
    return Object.prototype.toString.call(p) == '[object String]'
}

let a = 1;
switch (key) { // 保护代码的完整性,就是把代码的类型校验以后走到default 保证不能执行的代码也能执行到
    case value:
        
        break;

    default:
        break;
}






























export {
    
}