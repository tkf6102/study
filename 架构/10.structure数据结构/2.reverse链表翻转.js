// 翻转链表
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
    add(index, element) {
        if (arguments.length === 1) { // 就是说明像末尾加值
            element = index // 把index赋值给element
            index = this.size; // 索引表示最后一个元素,所以用最大尺寸
        }
        if (index < 0 || index > this.size) throw new Error('索引错误')
        if (index === 0) { // 说明是头部
            let head = this.head // 需要把当前head提取出来,因为node需要指针,就把提取出来的head作为上次的指针
            this.head = new Node(element, head) // 相当于一个大对象包裹无限层级的对象,最深处(最后一层)的next就是null
        } else { // 不是头部,所以走这里
            // 先获取一个
            let current = this.head;
            for (let i = 0; i < index - 1; i++) { // 找到索引的前一个
                // console.log(current);
                current = current.next
            }
            // 让创建的元素指向上一个元素的下一个
            current.next = new Node(element, current.next) // 新创建的元素的next 指向上一个元素的next(如果是结尾就是null)
        }
        this.size++
    }
    remove(index) { // 删除方法,每次传入索引
        if (index < 0 || index >= this.size) throw new Error('删除的索引错误')
        this.size--; // 每次结束把总量删除一个

        if (index === 0) {  // 如果是第0个索引,那就把第头部的next直接指向自己的下一个元素的next
            let head = this.head;
            console.log(head);
            console.log(this.head);
            console.log(this.head == head);
            this.head = this.head.next
            return head
        } else {
            let current = this.head
            for (let i = 0; i < index - 1; i++) { // 循环遍历了所有index小于指定值的-1的next 循环一次就获取了小于index-1的值
                current = current.next
            }
            let returnValue = current.next
            current.next = current.next.next
            return returnValue
        }
    }
    get(index) {
        if (index < 0 || index >= this.size) throw new Error('获取的索引错误')
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }
    // reverse 递归方式
    /*     reverse() { // 有点没懂,但是可以理解为 有一个变量存储着null, 就想冒泡排序里,每次存储上一个值,传递给下一个一样. 只不过是next.next值的修改
            // 用来递归的函数
            function reverse(head) { // 1. head参数是头部指针
                console.log(111);
                console.log(head);
                if (head === null || head.next === null) return head; // 如果头部为null或者头部的next为null 说明是到链表的尾巴(倒数第二个)或者链表只有一层 所以就不用递归翻转,结束即可
                console.log(222);
                console.log(head.next);
                let newHead = reverse(head.next) // 不停地执行这个函数, 一直找到最深层的next 也就是第一句话return head \\ 并且因为是递归,所以每层函数获得的head.next是不一样的 传给自己的参数head就是自己,所以把传进来的值给到自己的曾经的下级的next指针改为自己 然后把自己的next指针改为null
                console.log(333);
                // 从链表的地步开始翻转
                head.next.next = head; // 倒数第二个的next是倒数第一个 倒数第一个的next是null  只是想两层,每次两层之间导数据,然后一层一层就转换完数据了
                head.next = null; // 把自己的next值存储为null 
    
                return newHead // 返回的是新的头部
            }
           return reverse(this.head)
        //    this.head =  reverse(this.head)
        //    return this.head
        } */
    reverse() { // 非递归翻转 :老链表从左到右一个一个取值,然后从左往右插入翻转
        let head = this.head;
        let newHead = null;
        while(head !==null){
            let temp =head.next; // 拿到头部的下一个元素,这个元素要放到head中
            head.next = newHead; // ??
            newHead = head; // 新的头 获取的值是目前head剩余的元素指针 
            head = temp; // 获取next以后的所有元素
        }
        return newHead
    }
}


let ll = new linkList()

ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)
console.log(ll.reverse());
console.dir(ll, { depth: 1000 });