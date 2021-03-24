// npm i type-node typescript -g 
// type-code  方便code-runnder

// ts冒号后面都是类型
const str:string = 'zhufeng'
const num:number = 11;
const boolean:boolean = true;

// 联和类型(放多个类型)
let age:string|number = 1;

// 对象 数组 函数等类型
const arr:number[] = [1,23]; // 表示一个数组里的所有类型必须是数组

// 元祖
const tuple:[string,number] = ['zf',1] // 限制数组里第一个是字符串,第二个是数字 不能有第三个,前两个类型是强制

// null/undefined
let n:null = null;
let un:undefined = undefined;

// 枚举 只是声明类型 混合类型? 是代表所有类型都可以使用吗,自己测试
enum USER_ROLE {
    USER,
    MANAGE,
    ADMIN
}

console.log(USER_ROLE.USER)

// any 区分不出来类型,就写any 就相当于js了,不检测类型了
let array:any = [];

// object 非原始数据类型
// Object.create
let create = (obj:object)=>{
    
}
create({}) // 不能传普通值,必须是对象. 可以是[],{},function,new Date()等