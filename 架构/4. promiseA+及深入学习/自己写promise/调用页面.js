let Promise = require('./promise')
let pro = new Promise((resolve,reject)=>{
    // setTimeout(()=>{
    //     resolve(1)
    //     reject(2)
    // },500)
    resolve(1)
    // reject(2)
    // console.log(www); // 失败时候也是走的fail逻辑

})
pro.then(data=>{
    console.log('一级',data);
    return 123
},err=>{
    console.log('一级',err);
}).then(data=>{
    console.log('2data',data);
},err=>{
    console.log('2fail',err);
})