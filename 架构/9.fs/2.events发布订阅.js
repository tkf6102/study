const eventsEmiter = require('./1.events.js')
const util = require('util')
const Gilr = function(){}
// Object.setPrototypeOf(Gilr.prototype,eventsEmiter.prototype) // object方法 把events的原型继承给了girl 也相当于girl.prototype.__proto__ = eventsEmiter.prototype
util.inherits(Gilr,eventsEmiter) // 是node有的工具 但是实现原理就是Object.setPrototypeOf
let girl = new Gilr()
let fn = function(params){
    console.log('高兴2-once函数');
}
// girl.on('我开心1',()=>{
//     console.log('开心1');
// })
// girl.on('我高兴2',fn)
girl.once('我很高兴3-onec函数',fn)
girl.off('我很高兴3-onec函数',fn) // w如果挂载once之后直接off,根据once原型上的one.l方法,也可以过滤掉once绑定的方法

// girl.off('我高兴2',fn) // 卸载事件: 1. 名称正确 2. 方法一样

// girl.emit('我开心1',111,111)
// girl.emit('我高兴2',222,222)
girl.emit('我很高兴3-onec函数',222,222)
girl.emit('我很高兴3-onec函数',222,222)
girl.emit('我很高兴3-onec函数',222,222)
