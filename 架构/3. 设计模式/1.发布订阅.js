class Event {
    constructor(){
        this.arr = []
    }
    emit(){
        this.arr.forEach((item)=>{
            item()

        })
    }
    on(params){
        this.arr.push(params)
    }
}

let aa = new Event()
aa.on(function(){
    console.log('我是发布订阅模式第一个函数');
})

aa.on(()=>{
    console.log('第二个');
})
aa.emit()