let Promise = require('./promiseTest')
let pro = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(new Promise((resolve,reject)=>{
            resolve(1)
        }))
    },3000)
})
pro.then(data=>{
    console.log(data);
    return 111
}).then(data=>{
    console.log(data);
})