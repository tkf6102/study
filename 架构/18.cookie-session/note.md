## cookie session 和localStorage sessionStorage的区别
- localStorage和sessionStorage共同点
  - 本地缓存
  - 不能频繁切换,影响性能
  - 5M存储空间
- 不同点
  - sessionStorage是浏览器内存中 localStorage是硬盘中

- cookie和session
前提: http是无状态的
1. cookie是用来识别状态的 
2. 客户端-服务端都是可以设置的
3. 每次发送请求都携带cookie
4. 因为cookie是存储在用户本地,所以默认是不安全的,不能用来存放敏感信息
   
- session
基于安全角度考虑,所以有了session
1. session是基于cookie
2. session就是一个内存对象,服务器重启记录的东西就会丢失,不能持久化存储 =>一般放到redis 或者mongo中
3. 因为只是一个服务器访问记录,所以多服务器共享比较麻烦