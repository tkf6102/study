## 1. npm的使用
- npm node package manager(包) package.json 包就是多个文件的集合

- npm 中使用的时候,可以有两种包 
    1. 全局包 只能在命令行使用 
        在命令行里输入'env' 就会展示当前电脑配置的环境变量,所有输入的命令,都是执行电脑的绑定命令,执行a,但是a命令里其实是指向b路径的
    2. 本地包,下载在node_modules里,只能当前项目中执行,类似于require

### nrm/npm/nvm(淘宝源)
```
npm isntall nrm -g (全局安装nrm,更改源)
nrm ls (可以使用的源的列表)
nrm current(查看当前使用的源)
nrm use taobao/cnpm/npm(使用某个源)
nrm test(检测每个源的反馈速度)
```

### 创建自己的全局包
- package.json命名生成
- npm init -y 默认生成 也可以npm init 然后一步一步输入

1. npm link 链接,在全局的npm包下做一个链接(不是node_modulesmodules)
> package.json里加一行命令
```
"bin":{
    "pack-tkf":"./bin/www.js"
}
提示全局命令执行时对应的脚本,脚本必须增加
#! /usr/bin/env node环境解析变量
```
2. 创建指定路径的文件
2.5 文件里路径需要写一行方便文件解析的代码
#! /usr/bin/env node    =>按照node格式解析文件
3. 行间命令输入 npm link (可能是把bin命令写入全局npm)
4. 输入pack-tkf 就可以执行了(架构,预习,第五节课)

### 本地包
- 在代码中使用的,只是在开发中使用 --save-dev是开发环境下使用 --save是生产和开发都有的格式
- 默认安装包都是--save 基本都是这种,但是babel肯定是生产环境

#### 版本号
常见: 1.2.3 => 1 代表大功能 2 代表版本新增 3 代表bug更新
升级版本都是用行间命令,不是手动改
改动1 npm version major 更改大版本
改动2 npm version minor 新增功能
改动3 npm version patch 修补bug

版本控制:
版本: ^3.4.1 
    以3(大版本不能更改)开头的版本才可以
版本: ~3.4.1 
    代表4(中间层,解决bug),可以改动最后一位,第二位不能超过4(自身)
版本: >= 3.4.1
    必须大于这个版本才能使用
版本: <>= 3.4.1
    必须小于这个版本才能使用
固定版本: 3.4.1
## scripts脚本
就是package.json里的可执行命令
- npm run 执行的时候就是把package.json对应文件夹的node_modules下的bin目录临时放到全局环境变量 path里,如果 npm run 后面有命令,就会找到对应输入的 xxx命令 去scirpts里对应的名字去执行对应脚本,这个执行的命令在.bin命令下,是可以直接执行的

## 2. node中核心模块(util/events)

## 3.Buffer的应用