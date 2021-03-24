let str: string = 'str'
let num: number = Number('11')
let num1: Number = Number('22')
let num2: number = Number('33')
let num3: Number = 33
// let num4: number = new Number('44'); // 返回的是个实例,所以不能是字符串.可以是Number的实例 可以是Object
let num5: Number = new Number('55')
let num6: Object = new Number('66')
const arr: number[] = []; // 如果不设定类型就无法给数组传入值
const ar: [] = []
// ar.push(333)

arr.push(11)
// 
const arr1: boolean[] = []
arr1.unshift(true)

const enum ROLE {
    USER,
    ENV = 5
}
console.log(ROLE.USER)
console.log(ROLE.ENV)

const nu: null = undefined


const sym1: symbol = Symbol(1)
const sym2: symbol = Symbol(1)
console.log(sym1 == sym2)


const obj: object = function () { } // object是表示不是原始类型, 不能str,num,boo 只能func,[],{}    

let o; // 没赋值前就自动是any
o = 1;
let name1 = 'zf';
// name1 = 10 // 初始化是字符串,后面不允许更改


let c: (number | string) = 0 // 联和类型
c = '111'

let w: string | number;
(w! as number).toFixed(2) // 类型断言,就可以使用类型上的方法
let ee: string | number;
(<number>ee!).toFixed(3)

let w1: string | number;
w1! as any as string // 尽量不要使用双重断言,这样破坏原有数据结构

// 字面量
type Direction = 'up' | 'down' // 强制限定只能是这几个值
const d1: Direction = 'up'


type TyTest = 'a' | 'b'
const Ty1: TyTest = 'a'

function params(a: string, b: string): string {
    return a + b
}

params('1', '2')

type fn1 = (a: string, b: string) => string;

let fn: fn1 = (a: string, b?: string) => { // ?是非必须,但是不能是第一个,可以是后面的
    return '111'
}

let fn2: fn1 = (a: string, b: string = '3') => {
    return a + b
}

let fn3 = (a: string[]) => {
    return a
}

let fn4 = (a: (string | number)): string => {
    if (typeof a === 'string') {

    } else if (typeof a === 'number') {
        return '1'
    }
}


class A {
    x!: string;
    y!: number;
    private z!: null; // 私有的,只有自己可以使用
    protected c!: undefined; // 受保护的,只有自己和实例可以使用
    private ww!: number // 公共的,也是默认的
    readonly readonly1: '22'

    constructor(a: string, b: number, private xx?: number, ...args: number[]) {
        this.x = a
        this.y = b as number;
        this.ww = xx
    }
}
let a = new A('1', 10, 234234234)
console.log(a)


interface InterName {
    firstName: string,
    secName: number
}
function aa: InterName(): string{
    return '11'
}


interface ICounter {
    (): number; // 限制函数类型
    count: 0 // 限制函数上的属性
}
let fn1: any = () => {
    fn1.count++;
    return fn1.count;
}
fn1.count = 0;
let counter: ICounter = fn1;
console.log(counter());
console.log(counter());




let strOrNub: string | number;
// strOrNub.toLocaleString // 在没确认类型前,只能用共有方法
strOrNub = 123
strOrNub.toString()
let aaa: string & number;

let dom: HTMLElement|null = document.getElementById('app')
// let dom: HTMLElement = document.getElementById('app')! 就表示这个元素是肯定存在,所以不用写null
dom!.innerHTML = 'abc'; // 断言(发誓)一定有内容 ,没有问号就可以写成ele&&ele.innerHTML = 'xxx'
// 直接 强转某个类型

<HTMLElement>dom // 相当于强制是HTMLElement类型

let c1:string|number;
// <boolean>a 原来是string|number 不能断言成为boolean
// c1 as any as boolean // 双重断言 强转可以但是不建议




// !代表断言肯定存在
// ?代表  xx?.ww 代表xx如果存在 才取xx.ww   // 这个链判断运算符 是es7的 是js存在的

false ?? true // 如果是null/undefined 就返回后面的,其他都是返回前面的  就是判断null/undefined的

let type : 'a'| 'b'| 'c' = 'a'
// let w :type = 'a'

let arrFn = <T>(timer:number,count:T):T[]=>{
    let result =[]
    for(let i = 0;i<timer;i++){
        result.push(count)
    }
    return result
}
arrFn(3,2)

let TupleChange = <T,K>(tuple:[T,K]):[K,T]=>{
    return [tuple[1],tuple[0]]
}

TupleChange([1,2])


// 元祖的属性 里面的值一一对应 增加也只能增加里面有的类型
// 类的多个使用和翻转元祖
let tupleReverse = <T,K>(tuple:[T,K]):[K,T]=>{
    return [tuple[1],tuple[0]]
}

// 类型别名
type typeRename = <T,K>(a:[T,K])=>[K,T]
let fnTypeRename :typeRename = <T,K> (tup:[T,K]):[K,T]=>{
    return [tup[1],tup[0]]
}

// 能用接口就用接口
interface tupleReverse2{
    <T,K>(tuple2:[T,K]):[K,T]
}
// 直接function声明有问题
let a1a:tupleReverse2 = <T,K>(tup:[T,K]):[K,T]=>{
    return [tup[1],tup[0]]
}

// interface ISum<T>{ // 接口传入的时候的泛型
//     <U>(a:T,b:T):U

// }

// let sum:ISum<number> = (n:number,b:number):string=>{
//     return ''+n+b as any
// }


// sum(1,2)
interface T2<T = string>{
    name:T
}
type  t22= T2
let str2:t22 = {name:'zf1'}
// let str3:t22 ='wws'

interface Inumber{
    length:number,
}
function getLen<T extends Inumber>(num:T):T{
    return num
}
getLen({length:2})
// getLen(1)



// ts兼容性
// 1. 基本数据类型
// 只要你要,只要我有,就可以使用.
let n1 :string | number;
let n2!:number;
n1 = n2;

// 2. 数据类型的原型上方法
// 只要你要这个方法,只要我有这个方法 就可以使用
let str1 = {
    toString():string; 
}
let str3 :string = '1';
str1 = str3;

// 3. 接口兼容性
// 我的全部,你必须都有,不然无法使用.(我的代码,你必须都懂,不然无法使用.)
interface Ianimal{
    name:string,
    age:number
}
interface IPerson{
    name:string,
    age:number,
    sex:string
}

let p:IPerson = {
    name:'zf',
    age:10,
    sex:'男'
};
let animal:Ianimal = {
    name:'dog',
    age:10
}
// p = animal; // 必须是自己有被赋予值的全部属性才行
animal = p;


let fn33 =(a:string,b:string)=>a+b;
let fn44=(a:string)=>a;

fn33 = fn44;
fn44 = fn33  // 必须要有属性才能赋值,但是函数好像是参数可以没有. 多可以赋给单

// let sum1 = (a: string, b: string) => a + b;
// let sum2 = (a: string) => a;
// sum1 = sum2
// sum2 = sum1


function aaaa():void{
    return undefined; // 严格模式下必须undefined,不能是null
}

// never是报错,死循环 不能访问到的路径就是never

// 类型别名可以使用联和类型,接口可以继承
// new (name:string)=>T //  是解释为:返回一个实例吗 只是因为传入会自动typeof Person  所以返回实例等于typeof Person 


class Person{
    constructor(){}
    eat(){}
}
function CreateIns<T>(clazz:new ()=>T){
    let r = new clazz()
    return new clazz(); // 必须实例化才能拿到返回值
}
CreateIns<Person>(Person)


function isString(val:number|string):val is string{
    // return val // 强制返回boolean,所以不能把numberl/string返回
    return Object.prototype.toString.call(val) === '[object string]'
}

isString('1')

// 大的类型可以兼容小的类型
type NumberOrStr = number | string;
let numor1 :NumberOrStr = 'abc'

// 检测方式: 
// 鸭子检测: 只要叫声像鸭子,就是鸭子. => 类似就可以

// 接口的间的赋值不能多赋值少
// 类型赋予一个值可以兼容性,依旧多可以给少.
// let tomato ={
    
// }
let sum=(a:string,b:string):string=>a+b;
let sum2=(a:string):string=>a;
sum = sum2; // 函数少付给多,因为两个参数,但是只给了一个还是可以用.
// sum2 = sum

// function fnx(cn:()=>{})

function getType (cb:(val:number|string)=>{
    
})
getType((val1)=>{
    return '1'
})


interface aa123{
    name:'name',
    age:2
}
type MyPick = Pick<aa123,'age'>


















































export {
    // 如果写了export 就是在这个作用域里, 不写就是全局
}