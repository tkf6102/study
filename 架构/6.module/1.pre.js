// 如何让字符串执行
    // 1. eval // eval执行会向上查找变量,产生作用域问题
        // var a = 1
        // eval('console.log(a)') 
    // 2. new Function传参 (vue源码用的new Function)
      // 2.1不会像上级查找变量(干净环境)
            // let a = 1
            // let func = new Function('console.log(a)')
            // func()
      // 2.2最后一个参数是函数需要转换的,前面都是传给参数的变量
            // let a = 2
            // let func = new Function('a','console.log(a)')
            // func(100)
    // 3. node实现字符串执行是用自己的核心模块支持,而不是new Function/eval

// node分模块为三类
// (1)  第三方模块
//     需要安装,使用是用require引入

// (2) 自定义文件模块
//     任何一个自己写的js文件
// (3) 核心模块 可以直接使用
//     fs/http/path/vm/虚拟机模块
    // 1) 虚拟机
        // let vm = require('vm')  // 使用的很少,都是源码内部使用
        // let a = 1
        // vm.runInThisContext("console.log(100)") // 用法像eval,但是不能获取全局变量,相当于一个内部沙箱环境
    // 2) 文件模块(读取的文件不存在就会报错,写入文件不存在就会创建)
    let fs = require('fs')
    let book = fs.readFileSync('./age.txt','utf-8') // 同步阅读函数 返回内容 第一个参数是路径,第二个是编码
    let existUrl= fs.existsSync('./age.txt') // 同步读取文件是否存在,返回的是boolean 
    console.log(existUrl);
    console.log(book);
    // 3) path模块
        // path模块,和fs模块一般组合使用 resolve dirname join extname
            let path = require('path')
            console.log(__dirname);
            let currentPath = path.resolve(__dirname,'age.txt') // 解析路径,如果碰到/ 就会按照根目录来解析,直接到c盘了
            let currentPath1 = path.join(__dirname,'age.txt') // 拼接路径 碰到/ 只是拼接
            let parent = path.dirname('./a/b/c/age.txt') // 解析的是传入文件的所有父级路径,只是不展示当前文件的路径
            let extendName = path.extname('a.js') // 取扩展名,就算是a.min.js 也是取.js 

            // console.log(currentPath);
            // console.log(currentPath1);
            // console.log(parent);
            // console.log(extendName);


// vm runInThisContext (运行在这个上下文,沙盒)
// path resolve(解析路径) join(拼接路径) dirname(父路径) extname(拓展名)
// fs readSync(同步读取文件) existSync(同步测试文件是否存在,boolean)

// 遇到难题, 1. 先自己编写 2. 看源码 3. 再编 4. 看源码