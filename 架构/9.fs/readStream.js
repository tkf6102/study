const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const events = require('events')
const fs = require("fs")
class ReadStream extends events {
    constructor(path, options) {
        super()
        this.path = path;
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose;
        this.encoding = options.encoding || null;
        this.start = options.start || 0;
        this.end = options.end || null;
        this.flags = options.flags || 'r';
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.pos = this.start; // 每次的偏移量 并且给一个默认值(初始化的值)
        this.flowing = options.flowing || true
        this.open()
        this.on('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true
                this.read()
            }
        })
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            } else {
                this.fd = fd
                this.emit('open', fd)
            }
        })
    }
    read() {
        if (typeof this.fd != 'number') {
            return this.once('open', this.read) // 其实就相当于初始化触发的时候file describe 如果不是数字类型(肯定就是没初始化完成) => 就订阅一个open类型 反正this.open函数执行结束后会有一个emit触发open
        }
        if(!this.flowing)return ;
        let buffer = Buffer.alloc(this.highWaterMark)
        fs.read(this.fd, buffer, 0, this.highWaterMark, this.pos, (err, bytesRead) => {
            if (bytesRead) {
                console.log(bytesRead);
                this.pos+=bytesRead
                this.emit('data', buffer.slice(0,bytesRead))
                if(this.flowing){
                    this.read()
                }
            }else{
                if(this.autoClose){
                    this.emit('end')

                    fs.close(this.fd,(err,data)=>{
                        this.emit('close')
                    })
                   
                }
            }
        })
    }
    pause(){
        this.flowing = false
    }
    resume(){
        this.flowing= true
        this.read()
    }
}

module.exports = ReadStream