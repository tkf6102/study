/*
// 初级算法
function gcd2(a,b){
    var result = 1;
    for(var i = 1; i <= a && i <= b; i++ ){ // 往后循环的值只会越来越大,所以只要是可以同时模除 就可以赋值
        if(a%i == 0 && b%i == 0 ){
            result = i;
        }
    }
    return result;
}
console.log(gcd2(10,20)); */

// 欧几里得算法
function gcd(a,b){
    // 第一个永远模 第二个
    // 只要第二个模 0 
    // 就返回第一个
    if(b == 0){ // 余数得0 那上次的被除数就是最大公约数
        return a;
    }
    // 把余数作为第二个, 把第二个作为第一个
    var r = a % b;
    console.log(r);
    return gcd(b,r);
}

console.log(gcd(20,100));