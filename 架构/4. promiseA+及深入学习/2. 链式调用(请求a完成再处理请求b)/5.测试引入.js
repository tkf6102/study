let Promise = require('./5.自己测试')
let p1 = new Promise((resolve, reject) => {
    resolve(1)
    // setTimeout(() => { resolve(2) }, 2000)
}, err => { console.log(err); })

let p2 = p1.then((data) => { 
    console.log(data);
    return 11
 })
 p2.then((data)=>{
     console.log(data);
     return 33
 })