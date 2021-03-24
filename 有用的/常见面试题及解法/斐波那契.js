let fb = function(len){
    if(typeof len !== 'number')  throw('需要输入数字')
    let arr = [0,1]
    let num = 0
    for(let i =2;i<len;i++){
        arr.push(arr[i-2]+arr[i-1])
    }
    for(let k = 0;k<arr.length;k++){
        num+=arr[k]
    }
    return {
        count: num,
        fb:arr
    }
}
console.log(fb(0));