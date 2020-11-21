// const Promise = require("./promise");

const pro = new Promise((resolve,reject)=>{
    reject(1)
})
pro.then().then(data=>{
    console.log(data);
},err=>{
    console.log(err,'2级');
})