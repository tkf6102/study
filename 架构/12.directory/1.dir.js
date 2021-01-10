// 对文件夹操作也是fs的操作 
const fs = require('fs')
const path = require('path')

// 一般项目构建,文件的合并操作都是需要的
// 创建目录 删除目录 修改目录名称  创建文件(一般writeFile自动创建,使用很少) 删除文件

// 1. 创建目录 mkdirSync 
//      1) 不能重复创建 已经有个目录不能创建
//      2) 父级路径存在才能创建 mkdirSync('/c/b/a') 没有b级路径,就会报错
//    检测是否有文件fs.exist同步 - fs.exits是异步的,被废弃了  代替的是fs.access 代表是否可以访问这个文件
// fs.access(path.join(__dirname, 'c'), (bool) => {
//     // console.log(bool,'bool');
// })
// let bo = fs.existsSync(path.join(__dirname, 'c'));

// if (!bo) { // 如果不存在返回false, 就创建
//     fs.mkdirSync(path.resolve(__dirname, 'c'))
// }

// if (bo) { 
//     // fs.rmdir必须删除空文件夹(directory目录) 不然就就是报错
//     fs.rmdir(path.join(__dirname, 'c'), (data) => {
//         console.log(data, 'err1');
//     })
// }
// 调用删除方法时候,需要删除其内容,里面的结构是树形结构
// let dirs = fs.readdirSync('./a');  // a文件里有个空文件夹b 有个文件1.js
// dirs.map(item=>{ 
//     let currentPath = path.join('a',item);
//     let statObj = fs.statSync(currentPath);
//     console.log(statObj);
//     if(statObj.isDirectory()){ // 判定是文件夹就删除文件夹,预设文件夹里是空的,不能有其他文件
//         fs.rmdirSync(currentPath)
//     }else{ 
//         fs.unlinkSync(currentPath) // 文件使用断开连接unlink方法删除
//     }
// })
// console.log(dirs);
// 文件夹: fs.readdir 读目录(读取目录下的所有文件)  fs.stat 查看文件的状态  fs.mkdir 新建目录   fs.rmdir删除目录
// 文件:  fs.unlink操作文件   fs.rename重命名   

// 后期使用是用linux命令删除文件,但是为了讲解删除, 就用递归讲解