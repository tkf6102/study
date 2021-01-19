const options ={
    port:{
        option:'-p,--port <v>', // <v> 这个变量需要和--port隔开 不然会无法解析
        description:'Port to use *3003 <v>',
        usage:'zs --port 3000', // 案例: 如何使用 就是执行zs 端口号 3000
    },
    address:{
        option:'-a,--address <v>',
        description:'Address to use [0.0.0.0]',
        usage:'zs -a 127.0.0.1'
    },
    descritory:{
        option:'-d,--drectory <v>',
        description:'Show directory listings [true]',
        usage:'zs -d D:'
    }
}
module.exports = options;