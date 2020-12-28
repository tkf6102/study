// 发布订阅模式,和3设计模式里差不多  详情看五期视频 31级 http://www.javascriptpeixun.cn/course/1908/task/116725/show
// on emit off once newListener(只要传的值是这个,就后续开始监听所有on事件)
function EventEmitter() {
    this._events = {}
}
EventEmitter.prototype.on = function (typeName, fn) {
    if (!this._events) {
        this._events = {};

    }
    let callbacks = this._events[typeName] || []
    callbacks.push(fn)
    this._events[typeName] = callbacks
}
EventEmitter.prototype.emit = function (typeName, ...args) {
    if (this._events[typeName]) {
        this._events[typeName].forEach(fn => {
            fn(...args)
        });
    }
}
EventEmitter.prototype.off = function (eventName, callback) {
    if (this._events[eventName]) {

        this._events[eventName] = this._events[eventName].filter(event => {
            return (event !== callback) && event.l !== callback
        });
    }
}
EventEmitter.prototype.once = function (eventName, callback) {
    const one = ()=>{ // 做成切片编程,在执行on的回调以后就用off把这个函数删除掉
        callback()
        this.off(eventName,one)
    }
    one.l = callback // 函数也是对象 把对象身上存了个私有属性 方便off方法调用的是判定
    this.on(eventName, one) // 加上on事件
}


module.exports = EventEmitter