/* interface objType {
  num: number;
  str: string
}

let obj:objType = {
  num:1,
  str:'2'
} */

// interface t {
//   [propName:string]:number
// }
// let ob:t = {
//   q:1,
//   w:1
// }
// interface ajax{
//   (url:string,data:object):void
// }

// let login:ajax = function(url,data){
//   console.log(url,data)
// }

// login('1',{name:"jj"})

// interface aa{
//   name:string,
//   say():void; // 函数就是函数名并且写上形参入口后面描述类型
// }
// class a implements aa{
//   name: string = "1"
//   constructor(){
    
//   }
//   say(){
//     console.log(this.name)
//   }
// }
// let p = new a()
interface List<T>{ // T类似于vue里面的插槽,传入什么就是什么,但是必须传入
  jj : T[]; // jj代表类型里面已经明确的值,不声明无法使用 // 右侧T代表传入的类型以后的使用
  // 并且规定的是 必须是数组里面传入数字,而不能是字符串
}

let l:List<number> = {
  jj:[1,2,3] // 必须是List里面规定好的数据
  // jj:{}  必须是按照interface里面对应jj的属性来设定
}

console.log(l.jj)