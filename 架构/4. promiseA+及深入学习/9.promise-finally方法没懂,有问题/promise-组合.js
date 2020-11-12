const Promise = require("./promise.js")

Promise.prototype.finally = function(callback){
        // 其实还是then方法改装的
        return this.then((value)=>{
                
        },reason=>{
                
        })
}
// finally
// 本地浏览器是2020年11月10日17:35:12最新的谷歌,但是没有finally 谷歌86点几
/* 
1. 永远会执行finally
2. finally如果执行reject 就会把失败结果传出
3. finally如果执行resolve 就不会把resolve的value值传递给后面
*/


// catch
Promise.resolve(1).catch(()=>{
        console.log(2);
})