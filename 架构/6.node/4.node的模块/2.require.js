// 自己写的require
/* 1. require其实就是传入一个路径
   2. 然后resolve绝对路径
   3. 获取路径以后,
   4. 使用node的原生能力,fs读取文件内容
   5. 给外层包裹自执行函数,并传参数(5个,filename等)
   */
/* 
 1. 要先将./a的文件转化为绝对路径
 2. 读取这个文件,需要增加一个函数 函数内部需要返回module.exports
 3. 函数执行
 4. new Module 创建模块 根据文件名来创建 exports id 
 module.load 加载模块
*/
let path = require('path') // 操作路径: 绝对路径,相对路径,父路径,.js格式...
let fs = require('fs') // 操作文件: 阅读文件..
let vm = require('vm') // 虚拟机
function Module(id) {
   this.id = id; // 自身的路径,作为统一id标识
   this.exports = {} // module身上的exports

}
let wrapper = [
   '(function(exports,require,module,__filename,__dirname){',
   '\n})'
]
Module._cache = { // 缓存对象,后面会按照路径存一个键值表

}
Module._extensions = {
   '.js'(module) { // 根据路径结尾名称,可以加载对应方法
      let script = fs.readFileSync(module.id, 'utf8') // 使用node原生方法,加载绝对路径
      let fnStr = wrapper[0] + script + wrapper[1] // 把传入绝对路径的内容放到一个自执行函数里包裹起来
      let fn = vm.runInThisContext(fnStr) // 虚拟机的这个方法就是让字符串执行,并且返回一个真实的函数
      let exports = module.exports; // 对象的赋值,如果改地址就不变,改内容就是改变的
      // 1. 让包裹好的函数执行 并且用call方法指定this为module的exports
      // 2. 将其中需要的参数传入
      // exports = module.exports module.id是绝对路径 path.dianame是父级路径
      fn.call(exports, exports, req, module, module.id, path.dirname(module.id))
   },
   '.json'(module) {
      let script = fs.readFileSync(module.id, 'utf8') // 使用node原生方法,加载绝对路径
      module.exports = JSON.parse(script)
   }
}
function resolveFilename(filename) {
   /* 
   1. 获取路径基础路径以后,用resolve方法,把路径拼接
   2. 根据结尾参数 .js .json等加文件格式
   */
   let r = path.resolve(__dirname, filename) // 把传入的路径按照父路径和子路径拼接
   let isExists = fs.existsSync(r)
   if (isExists) {
      return r
   } else {
      let keys = Object.keys(Module._extensions);
      for (let i = 0; i < keys.length; i++) {
         let ext = keys[i];
         let tryFilename = r + ext;
         if (fs.existsSync(tryFilename)) {
            return tryFilename
         }
      }
      throw new Error('111 报错') // 不取消循环执行,故把报错取消
   }
}
function tryModuleLoad(module) {
   /* 
   尝试加载模块函数:
   1. 获取文件后缀名,根据后缀名调用不同的加载模块方法
   */
   let extname = path.extname(module.id) // 想的是 .js 或者.json
   Module._extensions[extname](module) // 把返回的.js/.json字符串,放到拓展名对象里的对应函数执行
   //    console.log(extname);
   // console.log(module);
}
function req(filename) {
   let id = resolveFilename(filename) // 测试路径方法,路径就是模块的唯一身份标识
   let cacheModule = Module._cache[id] // 从缓存对象里查看是否有缓存的对象
   if(cacheModule){ // 如果有,则把自身的exports返回
      return cacheModule.exports // 返回自身的exports
   } // 需要在后面加载/new 一个新实例前走缓存
   let module = new Module(id)
   Module._cache[id] = module
   // 加载这个模块
   tryModuleLoad(module)
   return module.exports;
}
let str = req('./a文件path和fs功能学习')
str = req('./a文件path和fs功能学习')
str = req('./a文件path和fs功能学习')
str = req('./a文件path和fs功能学习')
console.log(str);