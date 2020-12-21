// let num:number = 11;

// let str = '123';
// // str = 1;
// let obj:any = {
//     a:1,
//     b:'string',
//     // c:false
// }
// obj.c = true;

// let bb;
// bb = 12;
// bb = '12';

// let val:number|string = 0;
// val = '12sdsada';
// val = true;

// let obj:object|null = null;

// obj = {}

// let num:number|string;
// (num as string).length;
// (num as number).toFixed()

// function func(name:string):void{
//     return undefined;
// }

//定义一个规则
// type getName = (x:number,y:string)=>string;

// //实现规则
// let fn:getName = function(a:number,b:string):string{
//     return '真香';
// }

// console.log(fn(1,'很香'));


// let fn:(x:number) => number = (a:number) => a + 1;

// console.log(fn(1));


// function fn(name:string,age?:number):void{
//     console.log(name,age)
// }

//第一个参数不能为可选参
// function fn(name?:string,age:number):void{
//     console.log(name,age)
// }
// fn('社会,社会');

// function fn(name:string,age:number=10):void{
//     console.log(name,age)
// }
//   fn('社会,社会');

// function func(...arg:number[]){
//     console.log(arg);
// }
// func(1,2,3,4,5);

// let obj:any = {};

// //约束
// function fn(a:string):void;
// function fn(a:number):void;
// //实现
// function fn(a:any):void{
//     if(typeof a === 'string'){
//         obj.name = a;
//     }else if(typeof a === 'number'){
//         obj.age = a;
//     }
// }

// fn('超');
// fn(10);

// fn(true);


// console.log(obj);

// class Person {
//     // public name:string; //对类属性|方法类型的定义
//     // protected  name:string; 
//     private name:string;
//     constructor(n:string){
//         this.name = n;
//     }
//     say(){
//         console.log(this.name);
//     }
// }

// class Coder extends Person {
//     constructor(n:string){
//         super(n);
//     }
//     speak(){
//         // console.log(this.name);
//     }
// }

// let p = new Person('豪');
// p.say();
// let c = new Coder('你猜');

// p.name = '陆静';

// c.speak();
// console.log(p);



//多态
// class Person {
//     name:string; //对类属性|方法类型的定义 
//     constructor(n:string){
//         this.name = n;
//     }
//     say(){
//         // console.log(this.name);
//     }
// }

// class Coder extends Person {
//     constructor(n:string){
//         super(n);
//     }
//     // say(){
//     //     console.log('我是码农，我会写BUG');
//     // }
// }

// //__proto__.prototype.__proto__
// let c = new Coder('aaa');
// c.say();


// //抽象类
// abstract class Animal {
//     name:string;
//     constructor(name:string){
//         this.name = name;
//     }
//     abstract eat():void;
//     abstract say():void;
// }

// class Dog extends Animal{
//     say(): void {
      
//     }
//     eat():void{
//         console.log('啃骨头');
//     }
// }

// class Cat extends Animal{
//     say(): void {
      
//     }
//     eat():void{
//         console.log('爱吃小鱼');
//     }
// }

// ts重点和难点，接口、泛型


// interface Point {
//     x:number;
//     y:number;
// }

// let obj:Point = {
//     x:0,
//     y:0
// }

// obj.b = 10;

// interface Numbers {
//    [propName:string] : number;
// }

// let obj:Numbers = {
//     x:0,
//     y:0,
//     z:80
// }


// interface ajax {
//     (url:string,obj:object):void;
// }

// const axios:ajax = function(url:string,obj:object){
//     console.log(url,obj); 
// }

// axios('/login',{
//     age:10
// });


// interface P{
//     name:string;
//     say():void;
// }

// class Person implements P {
//     name:string;
//     constructor(n:string){
//         this.name = n;
//     }
//     say(): void {
//         // throw new Error("Method not implemented.");
//     }
// }

// let p = new Person('a');


class Min<T>{
    list:T[] = [];
    add(val:T){
        this.list.push(val);
    }
    getMin():T{
        let num = this.list[0];
        this.list.forEach(item=>{
            if(num > item){
                num = item; 
            }
        });
        return num;
    }
 } 

 /*
    m.add('a');
    m.add('b');

 */
// let m = new Min<number>();
// m.add(5);
// m.add(6);

// let m2 = new Min<string>();
// m2.add('a');
// m2.add('b');
// console.log( m2.getMin() );


// function createArray <T>(len:number,val:T):T[]{
//     let ary:T[] = [];
//     for(let i=0;i<len;i++){
//         ary.push(val);
//     }
//     return ary;
// }

// console.log(createArray<string>(3,'abc'));


interface withLen {
    length:number;
 }
 
 function logger<T extends withLen>(val:T){
     console.log(val.length);
 }
 
 logger<string>('zhufeng');





















export {}




