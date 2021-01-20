#! /usr/bin/env node
// 这个路径需要写对,不然会报系统找不到指定的路径



// 可读文件都会添加命令行解析 process.argv
// 可以使用commoner包来解析用户行间参数  @babel/node是解析es6代码成commonjs规范
// chalk可以让字体颜色变更,ejs是模板引擎解析,可以解析模板数据渲染页面
// 命令行帮助命令  -p, --port

const program = require('commander')
const package = require('../package.json') // 这个就是直接把package拿过来,当成一个对象使用
const userOptions = require('../config');
const {foreach} = require('../utils.js');
// console.log(userOptions);
// Object.values(userOptions).forEach(option => {
//     program.option(option.option,option.description)
// });
const useages =[]
foreach(userOptions,(option)=>{
    useages.push(option.usage)
    program.option(option.option,option.description)
})


program.on('--help',()=>{  // 监听只要有输入--help就会调用这个参数
    console.log('Usages:\r');
    useages.forEach(item=>{
        console.log(`  `+item);
    })
})
program.name('zs') // 设置Usage的名字
program.usage('--option <value>') // 设置Usage的属性

program.version(package.version); // 显示版本号 提供 --version命令
let userConfig = program.parse(process.argv) // 解析行间参数  // 问题: 此处解析的数据执行有问题
const defaultConfig = {
    port :8080,
    address:'localhost',
    directory:process.cwd(),
    ...userConfig
}
// console.log(defaultConfig);

// 1. 启动一个服务
const createServer = require('../src/server')
const server = createServer(defaultConfig)
server.start(); // 开启服务











// cmd命令行clear改为cls 如果是windows的话
