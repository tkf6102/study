class Observer{ // 被观察者
    constructor(name){
        this.name = name
        this.state = '睡着中'
        this.arr = []
    }
    emit(){
        this.arr.forEach((item)=>{
            item.update(this)
        })
    }
    on(o){
        this.arr.push(o)
    }
    setSatew(data){
        this.state = data
        this.emit()
    }
}

class subject{
    constructor(name){
        this.name = name
    }
    update(baby){
        console.log('当前' + this.name + '被通知了','当前的宝宝状态是' + baby.state);
    }

}
let observer = new Observer('小宝宝') // 创建被观察者实例
let father = new subject('baba')
let mother = new subject('mama')
observer.on(father)
observer.on(mother)
observer.setSatew('睡醒了')