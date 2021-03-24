let n = [1,2,3,4].reduce((current,nextNum,index,array)=>{
    return current+nextNum
})
console.log(n);


Array.prototype.reduce = function(callback,pre){
    for(let i = 0;i< this.length; i++){
        if(!pre){
            pre = callback(this[i],this[i+1],i+1,this);
            i++;
        }else{
          pre = callback(pre,this[i],i,this)  
        }
    }
    return pre
}
console.log([1,2,3,4,5].reduce(function(c,n,i,a){
    return c+n
}));