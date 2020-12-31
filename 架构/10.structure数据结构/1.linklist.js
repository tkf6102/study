// 链表 从头/尾 增加/删除性能比较好的
// 链表分为很多类: 单项链表 双向链表
class Node {
    constructor(element, next) {
        this.element = element
        this.next = next
    }
}
class linkList {
    constructor() {
        this.head = null; // 初始化值给个默认值 感觉head就是一个对象
        this.size = 0; // 总的大小
    }
    add(index,element ) {
        if(arguments.length === 1){ // 就是说明像末尾加值
            element = index // 把index赋值给element
            index = this.size; // 索引表示最后一个元素,所以用最大尺寸
        }
        if(index<0 || index >this.size)throw new Error('索引错误')
        if(index === 0){ // 说明是头部
            let head = this.head // 需要把当前head提取出来,因为node需要指针,就把提取出来的head作为上次的指针
            this.head = new Node(element,head) // 相当于一个大对象包裹无限层级的对象,最深处(最后一层)的next就是null
        }else{ // 不是头部,所以走这里
            // 先获取一个
            let current = this.head;
            for(let i = 0;i<index-1;i++){ // 找到索引的前一个
                // console.log(current);
                current = current.next
            }
            // 让创建的元素指向上一个元素的下一个
            current.next = new Node(element,current.next) // 新创建的元素的next 指向上一个元素的next 然后把之前的next所指向的对象包裹成为一个新对象 然后让上一次元素的next 指向他 : A指向b, 然后把b整体打包,然后把b的element改掉,把b的next指针改成刚才整体打包的数据
        }
        this.size++
    }
    remove(index){ // 删除方法,每次传入索引
        if(index<0 || index >=this.size)throw new Error('删除的索引错误')
        this.size--; // 每次结束把总量删除一个

        if(index === 0){  // 如果是第0个索引,那就把第头部的next直接指向自己的下一个元素的next
            let head = this.head;
            console.log(head);
            console.log(this.head);
            console.log(this.head==head);
            this.head = this.head.next
            return head
        }else{
            let current = this.head
            for(let i =0;i<index-1;i++){ // 循环遍历了所有index小于指定值的-1的next 循环一次就获取了小于index-1的值
                 current = current.next
            }
            let returnValue  = current.next 
            current.next = current.next.next
            return returnValue
        }
    }
    get(index){
        if(index<0 || index >=this.size)throw new Error('获取的索引错误')
        let current = this.head;
        for(let i =0;i<index;i++){
            current = current.next
        }
        return current
    }
}
let ll = new linkList()
ll.add(0,1) // 先加的成尾巴
ll.add(0,2) // 后加就成头 

ll.add(1,3) 
// ll.add(4)

// ll.remove(0)
// console.log(ll.get(0));
console.log(ll);

// 实现一个队列 先进先出 
class Queue{ 
    constructor(){
        this.ll = new linkList() // 用链表实现一个队列方法
    }
    // 就是往第一个里面添加并且返回true,队列满就是返回false
    offer(element){ 
        this.ll.add(element)
    }
    // peek 查看队列头部元素
    peek(){ 
        return this.ll.get(0);
    }
    remove(){ // 
        this.ll.remove(0)
    }
    
}
// const queue = new Queue()
// queue.offer(1)
// queue.offer(2)
// queue.remove()
// console.log(queue.peek(0));

// 用链表来模拟的队列 性能高一些 添加过程都是o(1) 主要是删除的性能问题