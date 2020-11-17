const ENUM = {
    PENDING: 'PENDING',
    RESOLVE: 'RESOLVE',
    REJECTED: 'REJECTED'
}
class Promise {
    constructor(execute) {
        this.state = ENUM.PENDING

        execute()
    }
    then(resolve, reject) {

    }
}
module.exports = Promise