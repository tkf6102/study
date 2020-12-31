// 遍历树的方法
// 1 深度遍历
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
    compare(a,b){
        return a-b
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
                compare =this.compare( currentNode.element ,element )// 每次做对比的值
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
}


const bst = new BST((a,b)=>{
    return b.age-a.age
})
// let arr = [1, 3, 2, 0, 0.5, 4, 5] // 二叉搜索树必须要有可比较性
let arr = [{age:10},{age:8},{age:19},{age:6},{age:15},{age:22}]
arr.forEach(item => {
    bst.add(item)
});
console.dir(bst, { depth: 20 });



