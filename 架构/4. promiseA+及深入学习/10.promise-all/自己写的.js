Promise.all2 = function (arr) {
    let index = 0
    let resultArr = []
    function result(val,ind){
        resultArr[ind] = val
        if(++index === arr.length){
            resolve(resultArr)
        }
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'string') {
                result(arr[i],i)
            } else if (typeof arr[i] === 'object') {
                arr[i].then(data => {
                    result(arr[i],i)

                })
            }
        }
    })

}