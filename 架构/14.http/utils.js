exports.foreach= (obj,callback)=>{
    Object.values(obj).forEach(option => {
        callback(option)
    });
}