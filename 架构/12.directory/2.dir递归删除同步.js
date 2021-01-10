// 同步删除  => 类似于链表的翻转 循环执行  从底下一层一层执行出来

// 同步删除 用递归的方式 遇到节点就处理节点 子节点处理完毕后删除自己
const fs = require('fs')
const path = require('path')
function removeDir(dir) {
    // 看是不是目录
    let statObj = fs.statSync(dir)
    // console.log(statObj);
    // 链表反转 有子目录就查看子目录的数据
    if (statObj.isDirectory()) {
        console.log(fs.readdirSync(dir));
        let dirs = fs.readdirSync(dir)
        dirs.forEach(item => {
            let currentPath = path.join(dir, item);
            console.log(currentPath);
            removeDir(currentPath)

        })
        fs.rmdirSync(dir)
    } else {
        console.log(2);
        fs.unlinkSync(dir)
    }


}
// removeDir('a')

// 异步删除方法
// 递归=> 只是想两步就行,后面不要去想
function rmDir(dir, cb) { 
    fs.stat(dir, (err, data) => {
        if (data.isDirectory()) {
            // 1) 先把获取的所有子路径拼接 2) 一点点处理
            fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map(item => path.join(dir, item));
                let index = 0;
                // 其实就是递归 每次把列表里的值传入到rmdir里一次 
                function next() {
                    // 并发循环 都是function next操作
                    if (index == dirs.length) return fs.rmdir(dir, cb)
                    let current = dirs[index++];
                    rmDir(current, next)
                };
                next()
            })
        } else {
            fs.unlink(dir, cb)
        }
    })
}
// rmDir('c', () => {
//     console.log('执行完成');
// })
// 异步=> 计数器并发处理=> 就是for循环
function rmDirMy(dir, cb) { // 老师版本,下面是自己的版本
    fs.stat(dir, (err, data) => {
        if (data.isDirectory()) {
            // 1) 先把获取的所有子路径拼接 2) 一点点处理
            fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map(item => path.join(dir, item));
                if (dirs.length === 0) fs.rmdir(dir, cb);
                let index = 0;
                // 其实就是递归 循环把列表里的值传入到rmdir里一次 最后一次执行值的时候根据最外层递归的索引 判定如果都循环过 则删除最外层文件
                function done() {
                    if (++index == dirs.length) { // 自己写过一版,但是没成功 只是这个判定有问题
                        fs.rmdir(dir, cb)
                    }
                }
                for (let i = 0; i < dirs.length; i++) {
                    rmDirMy(dirs[i], done)
                }
            })
        } else {
            fs.unlink(dir, cb)
        }
    })
}
// rmDirMy('c', () => {
//     console.log('执行完成');
//     console.log('异步-计数器删除-并发操作其实就是个并发操作')
// })

function rmdirStack(dir){
    let stack = [dir]; // 初始化栈结构
    let index = 0; // 初始索引
    let current;
    while(current = stack[index++]){ // 循环获取栈中的路径
       let statObj =  fs.statSync(current)  // 获取文件的属性
       if(statObj.isDirectory()){ // 文件属性自带方法,查看是否是文件夹
        let dirs = fs.readdirSync(current) // 把目录的内容取出
        stack = [...stack,...dirs.map(item=>path.join(current,item))] // 栈内容添加新增路径
       }
    }
    for(let i=stack.length-1;i>=0;i--){ // 倒叙循环列表 (为的是从后向前删除文件夹)
        let statObj = fs.statSync(stack[i]); // 读取文件
        if(statObj.isDirectory()){ // 根据文件类型删除
            console.log('文件夹');
            fs.rmdirSync(stack[i]) 
        }else{
            console.log('文件');
            fs.unlinkSync(stack[i])
        }
    }
}
rmdirStack('c')