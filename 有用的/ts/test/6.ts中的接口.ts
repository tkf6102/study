let arr = { 
    name:'zf',
    age:12
};

type arrs = typeof arr[]// 类型反推, 根据对象数据类型推断出一个类型

interface Iobj {
    name:string,
    age:number
};
function fn(params:Iobj) {
    
};
fn({
    name:'',
    age:1
})

interface Ifn{
    (str:string,num:number):void
}
let ss :Ifn = (str,num)=>{
    
}
ss('st',1)

interface Ifn3 {
    ():string
    count :number
};
let fn3 :Ifn3 = (()=>{
    fn3.count = 0
    return '111'
} ) as Ifn3;
fn3.count = 2;


// interface Vegetables{
//     color:string,
//     state:string,
// };

// interface Vegetables{ // 同名接口会直接合并
//     size:string
// }
// const tomato :Vegetables = {
//     color:'red',
//     state:'good',
//     size:'big'
// } as Vegetables; // 直接断言

// interface ITomota extends Vegetables{ // 直接写一个继承接口,可以添加多余的字段
//     size:string
// }

interface Vegetables{
    color:string,
    state:string,
    size?:string, // 接口的拓展,可以使用?语法,表示并不一定存在
    [key:string]:any, // 任意接口, 可以多填 
};

let tomato :Vegetables = {
    color:'red',
    state:'good',
    size:'big',
    xx:'sdfsdf',
    sdlfwes:23423
};
// tomato.xxx的时候,并没有[key:string]里面包含的值,只有size,color,state值

type Mytype = {key:string,val : string};
interface xx  {
    a:Mytype
};
interface Iarr {
    n : xx
};
type My = Iarr['n']['a'];

interface Ispeak{
    name:string,
    speak():void, // 这个是实例或者原型上的方法
    spe():void,
    sp():void
}
interface Ichinese{
    chineseSpeak():void
}
// implements和ectends的区别
// 1.  可以多个继承功能
// 2.  需要重写implements里的所有方法
class Mspeak implements Ispeak,Ichinese{
    name!:string
    public speak :()=>string; // 原型方法需要声明
    public sp:()=>void
    constructor(){
        this.speak = ()=>{ // Ispeak里的speak返回是void,但是这里返回字符串,是因为接口里的原型方法部分写void代表不关心返回值,并不是返回空. 
            return '123'
        }
        this.sp = ()=>{
        }
    }
    spe(){
        
    }
    chineseSpeak(){
        
    }
    
}
let mspeak = new Mspeak();
// mspeak.sp

// 虚拟类abstract
// 不能被new 强制继承他的类,必须写他身上的方法
abstract class Abstact {
    abstract aa :string
    abstract aFn():void
    abstract aFn2():string
};
class ClassAbstack extends Abstact{
    aFn2(): string {
        throw new Error("Method not implemented.");
    }
    aFn(): void {
        throw new Error("Method not implemented.");
    }

    aa!: string;
    
}


// 接口来描述实例
interface IPerson<T>{
    new(name:string):T
}
function createInstance<T>(clazz:IPerson<T>,name:string) {
    return new clazz(name)
};
class Person{
    constructor(public name:string){
        
    }
    eat(){

    }
}
// 这里面把Person这个类传给了createInstance,又因为泛型T传给了接口IPerson,就相当于类来描述自己的实例

let r = createInstance<Person>(Person,'zs')