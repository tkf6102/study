const url = require('url')
const request = {
    get url(){ // 属性取值器,访问对象里的这个属性 request.url的时候就会调用这个函数
        console.log('request-url');
        return  this.req.url
    },
    get query(){
        let {query} =url.parse(this.req.url,true)
        return query;
    },
    get path(){
        console.log(this.req.url);
        let {pathname} =url.parse(this.req.url,true)
        return pathname;
    }
};
module.exports = request;