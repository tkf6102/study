// process常用属性
    // process.env // 环境变量
    // process.argv // 设置参数,在程序执行时,传入一些用户定义的参数 (拿过来做本次执行的参数列表)
        // create --config xxx   识别-- 为key 后面跟随的是value值
    // process.cwd() // 相对路径,在哪里执行就是那个路径,经常不准
    // __dirname 是全局变量,每次webpack打包都会把文件做成自执行函数,给他传入__dirname就是绝对路径,但是__dirname是父级路径,需要加上文件名


// 常用包(不用自己处理argv)
// 使用别人的模块来实现参数的解析 commander(用的多) webpack是使用(yargs)
// 看别人的包一般是github上,但是如果描述比较少,就去npmjs上看
const  program  = require('commander')

program.version('1.0.0') // 设定版本号是1.0.0
program.command('create').action(()=>{console.log('输入create 触发的回调');})
program.option('-p, --port <v> ','set you port','第三个是默认值') // 前面是简写-全拼 参数  第二个参数是描述  第三个参数是默认,也就是不传就是默认

program.option('-c,--config <v>','set you config','第三个是默认值config')
program.parse(process.argv) // 解析node执行时刻传入参数,需要最后解析,前面的处理动作需要提前写好 !!

console.log(program.port);
console.log(program.config);

console.log(program);
// 本文件所在文件内,执行cmd 运行node  node 2.process.js --version







/* // process.argv实现
let arr = ['--a', 'b', '--c', 'd']
let nextArr = arr.reduce((obj, current, index, arr) => {
    // reduce接受一个函数,
    // 第一个参数: 上次累加的值/对象
    // 第二个参数: 数组中每次循环一个值从左到右传入current(第二个参数),
    // 第三个参数: 索引
    // 第四个参数,总数组
    console.log(current);
    // let reg = RegExp(/--/);
    if(current.includes('-')){
         obj[current.slice(2)] = arr[index + 1]
    }
    return obj
}, {})
console.log(nextArr); */