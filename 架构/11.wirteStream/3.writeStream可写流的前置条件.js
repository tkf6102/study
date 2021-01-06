const fs = require('fs')
const Events = require('events')
class Node {
    constructor(element, next) {
        this.element = element
        this.next = next
    }
}
class linkList {
    constructor() {
        this.head = null; // 初始化值给个默认值 感觉head就是一个对象
        this.size = 0; // 总的大小
    }
    add(index, element) {
        if (arguments.length === 1) { // 就是说明像末尾加值
            element = index // 把index赋值给element
            index = this.size; // 索引表示最后一个元素,所以用最大尺寸
        }
        if (index < 0 || index > this.size) throw new Error('索引错误')
        if (index === 0) { // 说明是头部
            let head = this.head // 需要把当前head提取出来,因为node需要指针,就把提取出来的head作为上次的指针
            this.head = new Node(element, head) // 相当于一个大对象包裹无限层级的对象,最深处(最后一层)的next就是null
        } else { // 不是头部,所以走这里
            // 先获取一个
            let current = this.head;
            for (let i = 0; i < index - 1; i++) { // 找到索引的前一个
                current = current.next
            }
            // 让创建的元素指向上一个元素的下一个
            current.next = new Node(element, current.next) // 新创建的元素的next 指向上一个元素的next 然后把之前的next所指向的对象包裹成为一个新对象 然后让上一次元素的next 指向他 : A指向b, 然后把b整体打包,然后把b的element改掉,把b的next指针改成刚才整体打包的数据
        }
        this.size++
    }
    remove(index) { // 删除方法,每次传入索引
        if (index < 0 || index >= this.size) throw new Error('删除的索引错误')
        this.size--; // 每次结束把总量删除一个

        if (index === 0) {  // 如果是第0个索引,那就把第头部的next直接指向自己的下一个元素的next
            let head = this.head;
            this.head = this.head.next
            return head
        } else {
            let current = this.head
            for (let i = 0; i < index - 1; i++) { // 循环遍历了所有index小于指定值的-1的next 循环一次就获取了小于index-1的值
                current = current.next
            }
            let returnValue = current.next
            current.next = current.next.next
            return returnValue
        }
    }
    get(index) {
        if (index < 0 || index >= this.size) throw new Error('获取的索引错误')
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }
}
class Queue {
    constructor() {
        this.ll = new linkList() // 用链表实现一个队列方法
    }
    // 就是往第一个里面添加并且返回true,队列满就是返回false
    offer(element) {
        this.ll.add(element)
    }
    // peek 查看队列头部元素
    peek() {
        return this.ll.get(0);
    }
    remove() { // 
        this.ll.remove(0)
    }

}
class WriteStream extends Events {
    constructor(path, options) {
        super()
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding;
        this.start = options.start || 0;
        this.mode = options.mode || 0o666;
        this.highWaterMarks = options.highWaterMarks || 16 * 1024


        this.writing = false; // 是否正在写入
        this.len = 0;  // 传入的总字节大小
        this.needDrain = false; // 是否需要drain监控
        this.offset = this.start; // 写入的位置,初始值是开始的位置
        this.cache = new Queue() // 缓存表
        this.open()
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) { this.emit('error') };
            this.fd = fd;
            this.emit('open', fd)
        })
    }
    write(chunk, encoding, cb) {
        // chunk可能是buffer可能是string 因为要计算它的长度 所以统一转换为
        Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length; // 每次测试chunk块都累加它的长度
        let flags = this.len < this.highWaterMarks
        this.needDrain = !flags; // 根据this.len和this.highWaterMarks来比较 如果超过限制,那就是需要drain值改动
        if (this.writing) {
            // 将数据写入到缓存中
            this.cache.offer({ // 把数据暂存到队列里
                chunk,
                encoding,
                cb
            })
        } else { // 这里是没有在写,或者首次写
            // 将数据写入到文件中
            this.writing = true;
            this._write(chunk, encoding, () => {

                cb && cb();
                this.clearBuffer()
            }) // 调用本地方法,真正的写入
        }
        return flags;
    }
    clearBuffer() {
        try {
            let data = this.cache.remove()
            let { chunk, encoding, cb } = data.element;
            this._write(chunk, encoding, () => {
                cb && cb();
                this.clearBuffer()
            }) // 调用本地方法,真正的写入
        } catch (error) {
            // 说明没删除了内容,也就是写入完成了
            this.writing = false;
            if (this.needDrain) {
                this.needDrain = false; // 为了下次继续使用
                this.emit('drain')
            }
        }


    }
    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        // 此处的position一直报函数递归错误,调整node版本为13.9.0以后函数错误 
        fs.write(this.fd, chunk, 0, chunk.length, (err, written) => {
            this.len -= written; // 把当前列表长度的缓存值按照长度删除
            this.offset += written; // 偏移量累加
            console.log(written);
            console.log(typeof written);
            console.log(this.offset);

            cb()
            console.log(111);
        })
        // fs.write(this.fd, chunk, 0, chunk.length,this.offset, (err, written) => {
        //     this.len -= written; // 把当前列表长度的缓存值按照长度删除
        //     this.offset += written; // 偏移量累加
        //     console.log(written);
        //     console.log(typeof written);
        //     console.log(this.offset);

        //     cb()
        // })
    }
}

module.exports = WriteStream