const Server = require('./application')
// 创建服务的
function createServer(defaultConfig){
   let {port,address,directory} = defaultConfig;

    let server = new Server({
        port,address,directory
    });
    return server;
}
module.exports = createServer