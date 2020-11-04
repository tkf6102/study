const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'
class Promise {
    constructor(exctor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.resolveArr = []
        this.rejectArr = []
        let resolve = (data) => {
            if (this.state !== PENDING) return
            this.value = RESOLVE
            this.resolveArr.forEach(item => item())
            console.log(data);
        }
        let reject = (err) => {
            if (this.state !== PENDING) return
            this.reason = err
            this.rejectArr.forEach(item => item())

            console.log(err);
        }
        exctor(resolve, reject)
    }
    then(onfufilled, rejected) {
        let promise2= new Promise((resolve, reject) => {
            if (this.state === RESOLVE) {
                let x = onfufilled(this.value)
                resolve(x)
                console.log(x, 11);
            }
            if (this.state === REJECT) {
                let x = reject(this.reason)
                resolve(x)
                console.log(x,22);
            }
            if (this.state === PENDING) {
                // 此处如果判定是pending状态,就先放到事件池,不执行
                this.resolveArr.push(() => { onfufilled(this.value) })
                this.rejectArr.push(() => { reject(this.value) })
                
            }
        })
        return promise2

    }
}

module.exports = Promise