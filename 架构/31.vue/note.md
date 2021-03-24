## rollup是什么
主要针对于js的模块打包工具,因为只是处理js,所以是针对于js类库打包的工具. 一般是vue或者react等

和webpack的区别是,webpack是可以处理css/html的但是rollup只是针对于js,但是会打包的非常小


## es6转es5语法
- rollup 打包工具
- 用babel/core 是babel的核心模块
- @babel/preset-env 主要是用来转换es6为es5的
- rollup-plugin-babel 把babel和rollup关联起来的插件
- rollup-plugin-serve 在本地用rollup起服务,实现静态服务
- cross-env 环境变量的设置

## 因为使用babel 所以需要有.babelrc文件
## public文件下的index.html是用来测试代码是否正确,本地测试

## package.json
- 如果是写了build:dev  : "rollup -c" 则是代表使用当前配置文件来打包
- 如果是npm run dev: 
  - cross-env ENV=development 代表的是启动cross-env 传一个参数ENV 他的值是development
  - rollup -c -w  启动rollup ,并且使用本地配置文件
    - -c是立即调用文件
    - -w是实时监控,实时打包


## vue实时监控
1. 所有属性遍历传入,是对象就监控
   1. 对象直接被赋值要监控
   2. 如果对象的value还是个对象还需要递归监控
2. 是数组也需要监控
   1. 先遍历每个值,是对象也走监控observe
   2. 用object.create()包装上数组原型方法,在原型方法调用前处理本地数据监控
      1. 调用前也是循环判定数组里是否是对象 
      2. 区分能增加对象的属性,push unshift splice这三个从新监控
   3. 数组只监控七个方法,索引没法监控,性能太差
3. 不能监控的点
   1. 对象里 大对象.实际对象.新增属性 = xx 这样是不能监控的,只能是$set  实际工作中感觉只有点击事件触发,强制对象里添加值才会用到,但是一般用不到
   2. 数组的索引添加,删除不监控. 最好用push等方法
4. 能监控的点
   1. 新增是对象可以监控
5. 根据_init函数里传递vm.$options传递数据到状态解析. 然后轮询将所有数据用Object.definedProperty对所有对象进行响应式处理

## 解决代理问题
目前是使用vm._data.name才能取值,我们需要做到 vm._data.name = vm.name 
```javascript
// state.js
// 每次状态都需要绑定响应式,只要是数据,都要循环绑定一次属性.  感觉何止是代码做成响应式,外面取值为了方便又循环了一次 
fucntion(vm,source,key){
  Object.definedProperty(vm,key,{
    get(){
      return vm[source][key]
    },
    set(newValue){
      vm[source][key] = newValue
    }
  })
}
proxy(vm,'_data',key)

```

## 模板解析
vue源码里的模板解析就是正则 // 正常情况下都应该是一个字符一个字符检测,每个尖叫号后面是不是个字母等

htmlparser2就是模板解析插件 无非是监控end / start /等函数 可以在npmjs.org里搜索到

- 从传入的html用正则匹配 while循环html字符串 每次匹配并处理完都用advance函数删除已经处理的字符串
  - 开始标签
  - attribute属性
  - 结束标签

### 将解析后的数据组成ast树状结构
利用栈结构处理

- 根据最外层el:'#app'这个参数获取模板,用多个正则表达式对其进行解析,从startTag开始尖叫号,到行间属性,到内容.  转换为ast语法树 => 转换为render函数=> 虚拟dom(可以增加额外的属性)=>生成真实DOM	
## render函数
就是讲ast语法的所有值根据内容转换为字符串,各种拼接后,new Function(code)

每次_update函数执行的时候


## MountComponents
- 每次都是


## vue流程
1. 初始化_init方法,把用户属性放大vm.$options上
   1. 对数据进行劫持 主要是对象和数组的劫持
      1. 对象是object.definedProperty
      2. 数组是索引不劫持太浪费性能,对七个方法进行劫持 都是对数组本身修改的方法进行劫持
   2. 如果数据上有el属性就会挂载这个组件
   3. 把$el的元素解析 : ast树不会每次更新都创建,因为_update函数执行的时候是数据改变,不会更改元素
      1. 解析里面的template的所有元素,循环解析成为ast语法 
      2. 拆行间属性 拆文本的小胡子语法 拆小胡子语法里面的变量值
      3. 转换render函数 
      4. render函数执行就是 虚拟dom vnode 
      5. 不用每次解析ast语法树,每次render函数执行就是解析js数据
   4. 生成render函数
   5. _render函数执行就是虚拟dom vnode
   6. _update(_render()) 
      1. 如果是新页面,就是按照vnode创建新元素
      2. 如果是更新操作就是把虚拟dom里的值解析,渲染成为真实dom(在其真实dom元素nextSibling下方创建一个新dom,删除原有dom)
      3. _update异步更新
         1. 找个地方存储数组 存储额外的判定是否相同的属性
         2. 后期可以执行的时候判定相同走最后一次
         3. 1)优先用promise(微任务) 2)用MutationObserber(ie方法) 3)node方法:?setImmediate  4) setTimeOut
   7. Watcher 监控组件更新,每次都会调用update方法,更新组件
      1. 就是一个观察者模式,每次数据更新都调用update方法更新数据
      2. 初始化就调用一次
      3. 在页面渲染需要使用的属性 watcher和dep 因为需要多对多的监控 所以watcher会把自身放到dep上,而dep也需要把watcher放到dep上. 交叉监控
         1. dep放到全局上
         2. 取值时,会在属性上存加个dep属性,用于存储渲染watcher
      4. watcher和dep
         1. 我们将更新的功能封装了一个watcher
         2. 渲染页面前，会将当前watcher放到Dep类上
         3. 在vue中页面渲染时使用的属性，需要进行依赖收集 ，收集对象的渲染watcher
         4. 取值时，给每个属性都加了个dep属性，用于存储这个渲染watcher （同一个watcher会对应多个dep）
         5. 每个属性可能对应多个视图（多个视图肯定是多个watcher） 一个属性要对应多个watcher
         6. dep.depend() => 通知dep存放watcher => Dep.target.addDep() => 通知watcher存放dep
         7. 双向存储 或者说交叉存储
      5. scheduler(调度员)
         1. 其实就是把watcher的执行指令做成异步,但是需要分批处理 并且做成异步操作 根据 promise MutataionObserver setmediate settimeout顺序
2. computed
> 底层就是Object.definedProperty
> 默认不执行,因为就是Object.def 所以只有取值操作的时候才会执行
> 多次取值如果依赖的值不变化就不会重新执行
> 依赖的值变化就会重新执行
> dirty是默认脏值true(取值后变为false) 依赖值变化以后就变为true