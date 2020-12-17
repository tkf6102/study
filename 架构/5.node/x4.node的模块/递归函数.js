// 1加到10之间的和
function a(num) {
    if (num == 10) return num
    return num + a(num + 1)
}
console.log(a(1));
// 1-10之间3的倍数的和

function add(num){
    if(num===10){
        return 0
    }
    if(num %3 === 0){
        return num +  add(num+1)
    }else{
        return add(num+1)
    }
}
console.log(add(1));