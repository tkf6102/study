declare let a :string // 可以纯用来防止报错,但是自己要确认确实存在
let a1 :any;
a1.xx(); 
let a2 :unknown;
// a2.xx() // unknown类型不能使用不存在的类型,  这个类型在联和类型里使用时候还是unknown类型,使用交叉类型时候还是其他类型
declare interface sss{
    // 全局可以使用
}
console.log(a)
export {
    
}