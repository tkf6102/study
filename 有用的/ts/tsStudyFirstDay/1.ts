// let num:number = 12;
// let bool :boolean = true;
let ary:Array<number| string> = ['1',1,23,4,'2'];
let ary2:[string,number] = ['1',1] // 此处是固定的顺序
let ar3 :string[]=['123']
let ary4 = {
  a:1,
  b:3
};
enum qq { // 枚举属性可以更有语义化,统一的数据管理,知道是获取的什么值
  success =1,
  fail = 2,
  upload = 3
}; 
let str1:qq = qq.success;

function voidFn():void{
  return undefined // 只能返回undefined 除此之外不能返回其他
}
let obj = {}
function func(x:number){
  if(typeof x === 'number'){
    
  }else{
    console.log(x)
  }
}
func(1)
export {}