const zlib = require('zlib')
const  fs = require('fs')
// node支持的压缩方式 gzip(用的多一些) deflate 
// 浏览器支持的压缩方式 gzip deflate  br(node可以用第三方包解析)
// 压缩.gz结尾的包 就是用=> gzip   重复性越高压缩率越高
// 方式有 同步 异步 流
// const content = fs.readFileSync('./压缩test.txt');
// let ss = zlib.gzipSync(content)
// fs.writeFileSync('./压缩文件.zip',ss)

// 转换流 既可以当独流,又可以当写流 (继承了可读流,也继承了可写流)
// 1和pipe是把读取的内容放到压缩包(不是真实文件,只是createGZip里) // 感覺createGzip只是創建了一個Gzip的容器
// 2和pipe是把(不是真实文件,只是createGZip里)里的内容写到真实文件里
fs.createReadStream('./压缩test.txt').pipe(zlib.createGzip()).pipe(fs.writeFileSync('./age.gz'))