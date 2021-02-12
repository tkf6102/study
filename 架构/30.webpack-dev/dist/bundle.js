(() => {
  var __webpack_modules__ = ({ // 就是一个对象里的key value值存储 
    "./src/a.js": // value是函数
      ((module) => {
        eval("module.exports = 'zfpx'\n\n//# sourceURL=webpack://webpack-dev/./src/a.js?");
      })
  });
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }

  (() => {
    eval("let str = __webpack_require__(/*! ./a */ \"./src/a.js\");\r\nconsole.log(str);\n\n//# sourceURL=webpack://webpack-dev/./src/index.js?");
  })();

})()
  ;