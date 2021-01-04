// 2 广度遍历(层序)
class Node {
    constructor(element, parent) {
        this.parent = parent; // 父级节点
        this.element = element; // 元素内容
        this.left = null; // 左子树(不是左节点一个点,而是左节点及以下所有的节点)
        this.right = null; // 右子树(不是右节点一个点,而是右节点及以下所有的节点)
    }
}
class BST { // binary search tree 
    constructor(compare) {
        this.root = null;
        this.size = 0;
        this.compare = compare || this.compare; // 如果传入一个自定义对比函数,就不使用原型上的方法
    }
    compare(a, b) {
        return a - b
    }
    add(element) {
        if (this.root === null) {
            this.root = new Node(element, null);
            this.size++
            return;
        } else {
            let currentNode = this.root; // 每次都需要从根节点开始查找,但是因为是二叉树,所以检索速度快了一半
            let parent; // 1. 用来记录父级,每次循环树下走,都需要知道父级才能继续向下 2. 最后new Node元素也是需要parent
            let compare; // 继续
            while (currentNode) {
                parent = currentNode; // 每次进入都要刷新父级,不然循环下走不是最新的父级就无法判定
                compare = this.compare(currentNode.element, element)// 每次做对比的值
                if (compare > 0) {  // 根据当前两元素的值
                    currentNode = currentNode.left; // 如果大,泽把左侧的节点元素当成父级 后面调用的时候继续这个节点向下查找
                }
                if (compare < 0) {
                    currentNode = currentNode.right;
                }
                if (compare == 0) { // 如果是相同数字,就会被过滤,不处理
                    currentNode.element = element
                }
            }
            if (compare > 0) {
                parent.left = new Node(element, parent) // 循环到最后一层,判定是小于父节点则放在左边
            } else if (compare < 0) {
                parent.right = new Node(element, parent) // 循环到最后一层,判定是大于父节点则放在右边
            }
            this.size++
        }
    }
    levelOrderTraversal() { // 遍历二叉树
        if (this.root === null) return; // 如果没有this.root 就结束访问
        let stack = [this.root]; // 有一个事件池 层级过多容易爆战 所以常见不是用栈 一般都是取一个操作一个 
        let index = 0; // 有一个初始化索引
        let currentNode; // 初始化节点
        while (currentNode = stack[index++]) { // 每次循环的节点就是栈里查找索引+1(每次就是上次添加的值)
            console.log(currentNode); // 这个就是每次的节点
            if (currentNode.left) { // 如果当前节点有值 就把数组里 添加一个值
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        }
        console.log(stack);
    }

}


const bst = new BST()
let arr = [10,8,19,6,15,22,20] // 二叉搜索树必须要有可比较性
arr.forEach(item => {
    bst.add(item)
});
bst.levelOrderTraversal()
console.dir(bst, { depth: 20 });



