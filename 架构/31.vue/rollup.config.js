// 这个和webpack相似度很高
// 不同的点在于可以使用es6语法 import
import server from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'


export default {
    input: './src/index.js', // 入口
    output: { // 文件出口
        file: 'dist/umd/vue.js', // 文件最终地点
        name: 'Vue', // 指定打包后全局变量的名字
        format: 'umd', // 统一模块规范
        sourcemap: true, // es6转换为es5 如果调试的时候有报错,就要打开这个属性,看报错在哪里(用es6的方式展示)

    },
    plugins: [
        babel({ // 插件集合
            exclude: 'node_modules/**' // 使用babel 但是解析的时候不解析node_modules下的所有文件
        }),
        // 根据开发环境判定,如果是开发环境才启动服务
        process.env.ENV === 'development'?server({ // 启动一个服务,一般是开发环境下才会启动
            open:true, // 服务打开
            openPage:'/public/index.html', // 服务默认执行路径
            port:3000, // 服务端口号
            contentBase:'', // 静态服务路径,不写就是默认当前路径下
        }):null,

    ],

}