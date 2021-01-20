const crypto = require('crypto'); // node的加密方法
// const fs = require('fs');

function cry(){
   let hashMd5= crypto.createHash('md5');
   hashMd5.update('hello worl');
   return hashMd5.digest('base64')
}
console.log(cry());