class Pointer{
    public a:number;
    constructor(private b :string[],protected c :()=>string){ // 函数作为参数,需要在=>后面表示返回值
        this.a = 1;
        console.log(this.b)
    }
}
const p =  new Pointer(['str'],()=>'123');
console.log(p)

class PointerSon extends Pointer{
    constructor(){
        super(['st'],()=>'12'); // 就相当于Pointer.call(this,参数1,参数2)
        // console.log(this.b) // 直接就会报错
        console.log(this.c)
    }
}
let a = new PointerSon();
console.log(a)

interface fnPar{
    ():void
}
const name:fnPar = () =>{
    
}

class ProtectedClass {
    protected   constructor (){

    }
}
class ProtectedClass2 {
    private   constructor (){

    }
}
// const proClas = new ProtectedClass() // 如果constructor前面有procted属性,就是被保护属性,不能new
// const proClas2 = new ProtectedClass2(); // 私有属性包裹以后,不能new 不能继承

class Animal{
    get type(){
        return '属性访问器'
    }
    static getType (){
        return 'es7语法,静态属性'
    }
    typeFn(){
        return '我只是一个原型上的方法'
    }
};

let ani = new Animal();
console.log(ani.type);
console.log(Animal.getType());
console.log(ani.typeFn())
export {
    
}