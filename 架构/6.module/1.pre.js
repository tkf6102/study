// 如何让字符串执行
    // 1. eval // eval执行会向上查找变量,产生作用域问题
        // var a = 1
        // eval('console.log(a)') 
    // 2. new Function传参 
      // 2.1不会像上级查找变量(干净环境)
            // let a = 1
            // let func = new Function('console.log(a)')
            // func()
      // 2.2最后一个参数是函数需要转换的,前面都是传给参数的变量
            let a = 2
            let func = new Function('a','console.log(a)')
            func(100)