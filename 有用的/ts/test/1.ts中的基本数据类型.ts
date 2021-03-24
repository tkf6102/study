let num1 : number = 1; // 常用
let num2 : Number = 2; // 2是实例,Number是类 可以用类来描述实例
let num3 : number = Number(1); // 类返回的是实例,所以也可以直接使用;
let num4 : Number = Number(2); // 类可以描述实例. 向下兼容

let arr: number[] = [12,2]; // 一类类型的集合
let arr1: (number|string)[] = [1,'2']; // 联和类型的数组,都可以装入
let arr2 :Array<boolean> = [true,false]; // 类型集合的另外一种写法

// 元祖: ts中自己实现的 绑定长度 绑定类型
let tuple: [string,number] = ['1',1]; // 必须按照tuple的类型来传入值
let tss:[string,number] = ['2',2]; // 名字随意
tuple.push(2) // 可以使用数组的方法
// tss.push(true) // 放入元祖值的时候必须是使用它定义的类型
tss.push(1) // 只要类型可以,元祖就可以使用.
// tuple[2] = 3 // 不能通过索引的方式来修改元祖

// enum 枚举 需要大写
// 写const不会生成单独的对象
// 可以反举,但是限于索引,会根据上一次的值来推断
const enum ROLE{
    USER,
    ADMIN
};

console.log(ROLE.USER) // 就是一个索引 0 
console.log(ROLE['ADMIN'])

// null 和undefined是任何类型的子类型
// 在严格模式下undefined !==null  tsconfig.ts文件里改下就行
let null1 :null ;
// null1 = undefined; // 只能给null
null1 = null;


// never : 出错,死循环,无法到达的终点 就是never类型
function throwErr():never{
    throw new Error('1')
}
throwErr()

function whileTrue():never{ // 都是直接给的类型
    while(true){
        
    }
}
whileTrue()

function noneSpace(num:number){
    if(typeof num === 'number'){
        
    }else{
        // 永远到达不了的代码
        num
    }
}

// void: // 形容一个函数没有返回值
// 不写就是undefined,非严格模式下void也可赋值给null
function voidFn():void{ 
    
}

export {
    // 防止模块间的数据进行共享. 不写就会把所有变量提升到全局
}