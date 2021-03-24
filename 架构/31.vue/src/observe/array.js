// 要重写的方法有七个 pop push shift unshift reverse sort splice 这七个方法会导致数组本身发生变化,所以会重写
let oldArrayMethods = Array.prototype;
export let arrayMethods = Object.create(oldArrayMethods);
let methods = [
    'pop',
    'push',
    'shift',
    'unshift',
    'splice',
    'reverse',
    'sort',
]

methods.forEach(method => {
    //做了一个切片编程,每次调用原有数组方法之前先处理一下我们的逻辑
    arrayMethods[method] = function (...args) { 
        oldArrayMethods[method].call(this, ...args);
        let inserted;
        let ob = this.__ob__;
        switch (method) {
            case 'push':
                // inserted = args
                break;
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted= args.slice(2)
                break;
        
            default:
                break;
        }
        // 如果有新增,需要观测数组里的每一项,是否有对象,有对象需要监测(definedproperty)
        if(inserted)ob.observeArray(inserted)
        
    }
})