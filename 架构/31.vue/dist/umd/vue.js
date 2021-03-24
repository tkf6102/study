(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /* 
  当前对象是不是对象,并且不是null
  */
  function isObj(data) {
    return _typeof(data) === 'object' && data !== null;
  }
  var callbacks = [];

  function flushCallbacks() {
    callbacks.forEach(function (cb) {
      return cb();
    });
    waiting = false;
  }

  var waiting = false;

  function timer(flushCallbacks) {
    var timerFn = function timerFn() {};

    if (Promise) {
      timerFn = function timerFn() {
        Promise.resolve().then(flushCallbacks);
      };
    } else if (MutationObserver) {
      var textNode = document.createTextNode(1);
      var observe = new MutationObserver(flushCallbacks);
      observe.observe(textNode, {
        characterData: true
      });

      timerFn = function timerFn() {
        textNode.textContent = 3;
      }; // 微任务

    } else if (setImmediate) {
      timerFn = function timerFn() {
        setImmediate(flushCallbacks);
      };
    } else {
      timerFn = function timerFn() {
        setTimeout(flushCallbacks);
      };
    }

    timerFn();
  } // 微任务是在页面渲染前执行 我取的是内存中的dom，不关心你渲染完毕没有


  function nextTick(cb) {
    callbacks.push(cb); // flushSchedulerQueue / userCallback

    if (!waiting) {
      timer(flushCallbacks); // vue2 中考虑了兼容性问题 vue3 里面不在考虑兼容性问题

      waiting = true;
    }
  }

  // 要重写的方法有七个 pop push shift unshift reverse sort splice 这七个方法会导致数组本身发生变化,所以会重写
  var oldArrayMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['pop', 'push', 'shift', 'unshift', 'splice', 'reverse', 'sort'];
  methods.forEach(function (method) {
    //做了一个切片编程,每次调用原有数组方法之前先处理一下我们的逻辑
    arrayMethods[method] = function () {
      var _oldArrayMethods$meth;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_oldArrayMethods$meth = oldArrayMethods[method]).call.apply(_oldArrayMethods$meth, [this].concat(args));

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
          // inserted = args
          break;

        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      } // 如果有新增,需要观测数组里的每一项,是否有对象,有对象需要监测(definedproperty)


      if (inserted) ob.observeArray(inserted);
    };
  });

  // 1. 如果是对象,会将对象不停循环递归进行检测
  // 2. 如果是对象,会劫持数组方法,并对数组中不是基本数据类型进行检测

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      // vue2中 会递归对value里的值用Object.definedproperty属性增加get/set方法,初始化就添加,很浪费性能
      // vue3中 使用proxy不用递归添加
      Object.defineProperty(value, '__ob__', {
        value: this,
        enumerable: false
      });

      if (Array.isArray(value)) {
        // value.__ob__ = this;
        // 如果是数组的话,并不会对索引进行观测. 这样递归循环会消耗很大的性能
        // 前端开发中很少很少操作索引 一般是Push shift unshiftw方法
        // __proto__是指向实例所属类的原型,因为这里只能控制到实例,所以使用__proto__ 
        value.__proto__ = arrayMethods; //  把数组的push,shift等方法都重写了,因为代码很多就放在单独的文件里
        // 如果数组里放的是对象 我再监控

        this.observeArray(value);
      } else {
        this.walk(value); // 观测一步的数据
      }
    }

    _createClass(Observe, [{
      key: "observeArray",
      value: function observeArray(value) {
        // 只要是对象,哪怕是数组里的对象,还是需要递归监控的. 性能比较差
        value.forEach(function (item) {
          // 处理了数组中每一个对象
          observe(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          // 其实就是循环执行响应式
          definedReactive(data, key, data[key]);
        });
      }
    }]);

    return Observe;
  }();

  function definedReactive(data, key, value) {
    // 不是判断data,因为data是永远是对象. 而value是每次循环出来的值
    // 递归判断value是不是个对象,如果是个对象就还是会执行new Observe
    // 
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (value == newValue) return;
        observe(newValue); // 劫持数据,因为有可能用户把原有的对象直接赋值为新对象,这样是没对新对象进行数据劫持,所以需要observe递归检测一下

        value = newValue; // 感觉每次设置值的时候就会自动把原有值转换为新值
      }
    });
  }

  function observe(data) {
    var isObject = isObj(data); // 其实这个对象本意上判断两层,第一个层是判断是否是对象 2. 后期会递归,但是如果不是对象就不会递归了

    if (!isObject) return;
    if (data['__ob__']) return; // 专门用来格式化数据的项目

    return new Observe(data);
  }

  function initState(vm) {
    var opts = vm.$options; // vue的数据来源很多 比如: data computed watch 属性(props) methods
    // 这个顺序是源码里面标识好的,  按照 props methods data computed watc 顺序

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function proxy(vm, source, key) {
    // 为的是vm._data.aa 取值不太方便,所以为了方便用户取值,多做一层代理, vm.aa 就可以直接取值 取值实际还是vm._data.aa的值
    // 此处自己有报错，实现无线内存溢出。 原因是给defineProperty设置值的时候，vm，source了 实际上响应属性是按照 vm的key取值 返回vm[source][key]
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  } // 为什么这些处理数据函数不分割出去? 因为这些是主线数据

  function initData(vm) {
    var data = vm.$options.data; // vue有检测,对$开头的属性不会进行代理
    // 1. 把data数据挂在到vm 也就是vue实例上 也就可以使用this._data使用了
    // 2. 如果data是函数,需要让他执行,但是这里面的this就会跑偏,所以使用.call执行绑定this指向 

    data = vm._data = typeof data === 'function' ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, '_data', key);
    } // 数据劫持 数据更新需要收到提示,更新页面
    // mvvm 数据变化需要驱动视图变化
    // Object.definedProperty 给属性添加set 和get方法


    observe(data); // 响应式原理
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}
  // html字符串 =》 字符串  _c('div',{id:'app',a:1},'hello')

  function genProps(attrs) {
    // [{name:'xxx',value:'xxx'},{name:'xxx',value:'xxx'}]
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          // color:red;background:blue
          var styleObj = {};
          attr.value.replace(/([^;:]+)\:([^;:]+)/g, function () {
            styleObj[arguments[1]] = arguments[2];
          });
          attr.value = styleObj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function gen(el) {
    if (el.type == 1) {
      // element = 1 text = 3
      return generate(el);
    } else {
      var text = el.text;

      if (!defaultTagRE.test(text)) {
        return "_v('".concat(text, "')");
      } else {
        // 'hello' + arr + 'world'    hello {{arr}} {{aa}} world
        var tokens = [];
        var match;
        var lastIndex = defaultTagRE.lastIndex = 0; // CSS-LOADER 原理一样

        while (match = defaultTagRE.exec(text)) {
          // 看有没有匹配到
          var index = match.index; // 开始索引

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")")); // JSON.stringify()

          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }

  function genChildren(el) {
    var children = el.children; // 获取儿子

    if (children) {
      return children.map(function (c) {
        return gen(c);
      }).join(',');
    }

    return false;
  }

  function generate(el) {
    //  _c('div',{id:'app',a:1},_c('span',{},'world'),_v())
    // 遍历树 将树拼接成字符串
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? genProps(el.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名 

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //  用来获取的标签名的 match后的索引为1的

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配开始标签的 

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配闭合标签的
  //           aa  =   "  xxx "  | '  xxxx '  | xxx

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'

  var startTagClose = /^\s*(\/?)>/; //     />   <div/>
  // ast (语法层面的描述 js css html) vdom （dom节点）
  // html字符串解析成 对应的脚本来触发 tokens  <div id="app"> {{name}}</div>
  // 将解析后的结果 组装成一个树结构  栈

  function createAstElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      parent: null,
      attrs: attrs
    };
  }

  var root = null;
  var stack = [];

  function start(tagName, attributes) {
    var parent = stack[stack.length - 1];
    var element = createAstElement(tagName, attributes);

    if (!root) {
      root = element;
    }

    if (parent) {
      element.parent = parent; // 当放入栈中时 继续父亲是谁

      parent.children.push(element);
    }

    stack.push(element);
  }

  function end(tagName) {
    var last = stack.pop();

    if (last.tag !== tagName) {
      throw new Error('标签有误');
    }
  }

  function chars(text) {
    text = text.replace(/\s/g, "");
    var parent = stack[stack.length - 1];

    if (text) {
      parent.children.push({
        type: 3,
        text: text
      });
    }
  }

  function parserHTML(html) {
    function advance(len) {
      html = html.substring(len);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end; // 如果没有遇到标签结尾就不停的解析


        var attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
        }

        return match;
      }

      return false; // 不是开始标签
    }

    while (html) {
      // 看要解析的内容是否存在，如果存在就不停的解析
      var textEnd = html.indexOf('<'); // 当前解析的开头  

      if (textEnd == 0) {
        var startTagMatch = parseStartTag(); // 解析开始标签

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          end(endTagMatch[1]);
          advance(endTagMatch[0].length);
          continue;
        }
      }

      var text = void 0; // //  </div>

      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        chars(text);
        advance(text.length);
      }
    }

    return root;
  } // 看一下用户是否传入了 , 没传入可能传入的是 template, template如果也没有传递
  // 将我们的html =》 词法解析  （开始标签 ， 结束标签，属性，文本）
  // => ast语法树 用来描述html语法的 stack=[]
  // codegen  <div>hello</div>  =>   _c('div',{},'hello')  => 让字符串执行
  // 字符串如果转成代码 eval 好性能 会有作用域问题
  // 模板引擎 new Function + with 来实现

  function compileToFunction(template) {
    var root = parserHTML(template); // 生成代码 

    var code = generate(root);
    var render = new Function("with(this){return ".concat(code, "}")); // code 中会用到数据 数据在vm上

    return render; // render(){
    //     return
    // }
    // html=> ast（只能描述语法 语法不存在的属性无法描述） => render函数 + (with + new Function) => 虚拟dom （增加额外的属性） => 生成真实dom
  }

  function initMixin(Vue) {
    //  可以扩展很多原型方法
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 原型上的状态挂载到vm实例上
      // 分割代码

      initState(vm); // 初始化状态 做数据劫持 所有数据都监听

      if (vm.$options.el) {
        // 如果有元素 需要将数据挂在到这个模板上
        vm.$mounted(vm.$options.el);
      }
    };

    Vue.prototype.$mounted = function (el) {
      el = document.querySelector(el);
      var vm = this; // 获取自己

      var options = vm.$options;

      if (!options.render) {
        // 如果render函数没有 => render函数就是渲染函数,他的优先级比el的优先级更高,因为后期还是会做成渲染函数,每次执行都是调用渲染函数
        var template = options.template;

        if (!template && el) {
          // 如果模板也没有 => 这个是组件里的template部分,
          template = el.outerHTML;
          var render = compileToFunction(template); // 把当前模板变成一个函数

          options.render = render; // 把编译后的模板函数直接传递给options.render属性,后期就可以直接使用这个属性
        }
      }
    };
  }

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    // 其实就是个函数,返回一个对象  你传入了什么,就返回什么对象
    return vnode(vm, tag, data, data.key, children, undefined);
  }
  function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, data, key, children, text) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text // .....

    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      // createElement
      return createElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };

    Vue.prototype._v = function (text) {
      // createTextElement
      return createTextElement(this, text);
    }; // 用来把对象做成字符串 不然靠原生展示就是[object Object]


    Vue.prototype._s = function (val) {
      // stringify 
      if (_typeof(val) == 'object') return JSON.stringify(val);
      return val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render; // 就是我们解析出来的render方法，同时也有可能是用户写的

      var vnode = render.call(vm);
      return vnode;
    };
  }

  function patch(oldVnode, vnode) {
    if (oldVnode.nodeType == 1) {
      // 用vnode  来生成真实dom 替换原本的dom元素
      var parentElm = oldVnode.parentNode; // 找到他的父亲

      var elm = createElm(vnode); //根据虚拟节点 创建元素
      // 在第一次渲染后 是删除掉节点，下次在使用无法获取

      parentElm.insertBefore(elm, oldVnode.nextSibling);
      parentElm.removeChild(oldVnode);
      return elm;
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag;
        vnode.data;
        var children = vnode.children,
        text = vnode.text;
        vnode.vm;

    if (typeof tag === 'string') {
      // 元素
      vnode.el = document.createElement(tag); // 虚拟节点会有一个el属性 对应真实节点

      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  // import Watcher from "./observer/watcher";
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      // 更新vnode属性,其实都是对象,多个参数
      // 既有初始化 又又更新 
      var vm = this; //1 感觉是创建新节点,并且把老节点删除

      vm.$el = patch(vm.$el, vnode);
    };

    Vue.prototype.$nextTick = nextTick;
  } // 后续每个组件渲染的时候都会有一个watcher

  function Vue(options) {
    this._init(options);
  } // 给原型上挂载方法的处理函数, 防止每次给原型挂载方法都在主页面,很冗余.


  initMixin(Vue); // 初始化属性

  renderMixin(Vue); // _render render函数形成及挂载在页面属性里

  lifecycleMixin(Vue); // _update

  return Vue;

})));
//# sourceMappingURL=vue.js.map
