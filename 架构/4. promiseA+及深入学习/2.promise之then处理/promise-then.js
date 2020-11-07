console.log('myPromise');
const ENUM = {
    PENDING: "PENDING",
    ONFULFILLED: "ONFULFILLED",
    ONREJECTED: "ONREJECTED"
}
class Promise {
    constructor(executor) {
        this.state = ENUM.PENDING
        this.value = undefined
        this.resaon = undefined
        this.onResolvedCallBacks = []
        this.onRejectedCallBacks = []
        const resolve = (value) => {
            if (this.state == ENUM.PENDING) {
                this.value = value
                this.state = ENUM.ONFULFILLED
                this.onResolvedCallBacks.forEach(fn=>fn()) // 调用成功回调时
            }
        }
        const rejected = (resaon) => {
            if (this.state == ENUM.PENDING) {
                this.resaon = resaon
                this.state = ENUM.ONREJECTED
                this.onRejectedCallBacks.forEach(fn=>fn())
            }

        }
        try {
            executor(resolve, rejected)
        } catch (error) {
            rejected(error)
        }
    }
    then(onFulfilled, onRejected) {
        if(this.state == ENUM.ONFULFILLED){
            onFulfilled(this.value)
        }
        if(this.state == ENUM.ONREJECTED){
            onRejected(this.resaon)
        }
        if(this.state == ENUM.PENDING){ // 如果在调用then状态是pending(异步)
            this.onResolvedCallBacks.push(()=>{ // 将成功函数放到订阅数组里存储,利用切片编程,可以给其传参
                onFulfilled(this.value)
            })
            this.onRejectedCallBacks.push(()=>{
                onRejected(this.resaon)
            })
        }
    }
}
module.exports = Promise