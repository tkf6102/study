const proto = {
    // 原来是手写get/set方法 后来拓展改为循环添加
    // 这也是对象的get方法的另外一种引用,使用__defineGetter__可以只在在对象里添加和get/set相同方法 
    // get url(){
    //     console.log('context-url');
    //     return this.request.url;
    // },
    // get query(){
    //     return this.request.query;
    // },
    // get path(){
    //     return this.request.path;
    // },
};

// 代理方法
function defineGetter(target, keys) {
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        proto.__defineGetter__(key,function () {
            // 此方法非标准,越不标准兼容性一般越好
            return this[target][key]
        })
    }
}
function defineSetter(target, keys) {
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        // 每次给属性设置值,设置的是response上的值,而不是ctx里的值
        proto.__defineSetter__(key,function (val) {
             this[target][key] = val
        })
    }
}
defineGetter('request', ['url', 'query', 'path'])
defineGetter('response', ['body'])
defineSetter('response',['body'])
module.exports = proto;