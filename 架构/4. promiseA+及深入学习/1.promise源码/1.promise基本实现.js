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
        const resolve = (value) => {
            if (this.state == ENUM.PENDING) {
                this.value = value
                this.state = ENUM.ONFULFILLED

            }
        }
        const rejected = (resaon) => {
            if (this.state == ENUM.PENDING) {
                this.resaon = resaon
                this.state = ENUM.ONREJECTED
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
    }
}
module.exports = Promise