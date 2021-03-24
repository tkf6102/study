export function createElement(vm, tag, data = {}, ...children) {
    // 其实就是个函数,返回一个对象  你传入了什么,就返回什么对象
    return vnode(vm, tag, data, data.key, children, undefined);
}

export function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
}

function vnode(vm, tag, data, key, children, text) {
    return {
        vm,
        tag,
        data,
        key,
        children,
        text,
        // .....
    }
}