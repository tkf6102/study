const response = {
    _body:'',
    get body(){
        return this._body
    },
    set body(val){
        console.log(999);
        this._body = val;
        console.log(this._body,'this._body');
        // this ==> ctx.response 所以添加一个res
        this.res.statusCode = 200;
    }
};
module.exports = response;