namespace Hello{
 export   class Dog{
        
    }
}
Hello.Dog
namespace Hello{
    export class Dog1{

    }
}

module Hello{
    export namespace Grand {
        export const a ='huayuan'
    }
}
Hello.Grand.a
// 命名空间最后会编译成为自执行函数
// 命名空间可以重名
// 可以用module和命名空间一样
// 命名空间可以嵌套,但是里面必须要有值
// namespace / module是内部模块
// 一般使用外部模块 
// import export