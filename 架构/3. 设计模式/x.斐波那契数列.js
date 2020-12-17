/* 
    斐波那契数列: 前两个是0,1 从第三个值开始,就是前两个的相加
        传入要多少个数字,就累加多少
*/
function fibonacci(value){
    let arr = [0,1]
    if(value<2)return arr
    for(let i = 2;i<value;i++){
        arr[i] = arr[i-1] + arr[i-2]
    }
    return arr
}

console.log(fibonacci(20))