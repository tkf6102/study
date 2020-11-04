let PENDING = 'PENDING'
let RESOLVE = 'RESOLVE'
let REJECTED = 'REJECTED'
class Promise3 {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        let resove = (value) => {
            if (this.state !== PENDING) return
            this.value = value
            this.state = RESOLVE
        }
        let rejected = (reason) => {
            if (this.state !== PENDING) return
            this.reason = reason
            this.state = REJECTED
        }
        try{
            executor(resove, rejected)
        }catch(err){
            rejected(err)
        }
    }
    then(onFuFilled, onReject) {
        if (this.state === RESOLVE) {
            onFuFilled(this.value)
        }
        if (this.state === REJECTED) {
            onReject(this.reason)
        }

    }
}

module.exports = Promise3