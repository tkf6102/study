let digui = function(start,end){
    if(start === end){
        return start
    }
    return start+ digui(start + 1,end)
}
console.log(digui(1,10));