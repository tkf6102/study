// 摘要算法 加密算法 加密后能解密回来 才是加密算法
const crypto = require('crypto')
// md5是不可逆的,1)如果内容相同,结果是一致的,2)结果长度是一致的
// 雪崩效应指的是: 哪怕只有一点点改动,结果都完全不同 hello = 5d41402abc4b2a76b9719d911017c592   hello1 = 203ad5ffa1d7c650ad681fdff3965cd2
// 以后会讲到sha1 sha2 hmac
console.log(crypto.createHash('md5').update('hello').digest('hex'));
console.log(crypto.createHash('md5').update('hello1').digest('hex'));