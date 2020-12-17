// var a = 'hello'
// setTimeout(()=>{
//     a = 'world'
// },1000)
var a = {
    a:'hello'
}
setTimeout(()=>{
    a.a = 'world'
},1000)
module.exports = a