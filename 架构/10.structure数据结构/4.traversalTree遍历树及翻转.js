// 遍历树的方法
// 1 深度遍历 :  前序/中序/后序就是对根节点的访问顺序,前序就是先访问,中序就是第二访问,后序就是最后访问
// 前序遍历:preOrderTraversal: 先访问根节点 再访问左子树 再访问右子树
    // 特点: 先处理父亲节点,后处理儿子
// 中序遍历:inOrderTraversal 先访问左/右子树 中间访问根节点 再访问左/右子树
    // 特点: 按照顺序遍历,可以是从大到小,或者从小到大
// 后序遍历:posOrderTraverSal 先访问左子树 再访问右子树 最后访问根节点
    // 特点: 先处理儿子节点,后处理父级节点
// 层序遍历:levelOrderTraversal 从上到下,从左到右依次访问每一层节点
// 翻转二叉树其实就是在遍历的时候将node中的left和right取出,掉换位置,只要是遍历就行,不管是前序/中序/后续
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
    preOrderTraversal(visitor) { // 前序遍历 : 
        let root = this.root; // 获取根节点
        function preOrder(node) {
            if (node === null) return; // 循环到节点无为止
            // console.log(node.element);
            visitor.visitor(node)
            preOrder(node.left)
            preOrder(node.right)
        }
        preOrder(root)

    }
    inOrderTraversal(){ // 中序遍历
        function orderTraversal(node){
            if(node === null)return;
            orderTraversal(node.left)
            console.log(node);
            orderTraversal(node.right)
        }
        orderTraversal(this.root)
    }
    posOrderTraversal(){ // 中序遍历
        function orderTraversal(node){
            if(node === null)return;
            orderTraversal(node.left)
            orderTraversal(node.right)
            console.log(node);

        }
        orderTraversal(this.root)
    }
    reverseTraversal(){
        function orderTraversal(node){
            if(node === null)return;
            let left = node.left;
            node.left = node.right;
            node.right= left;
            orderTraversal(node.left)
            orderTraversal(node.right)
            console.log(node);

        }
        orderTraversal(this.root)
        return this.root;
    }
}


const bst = new BST((a, b) => {
    return a.age - b.age
})
// let arr = [1, 3, 2, 0, 0.5, 4, 5] // 二叉搜索树必须要有可比较性
let arr = [{ age: 10 }, { age: 8 }, { age: 19 }, { age: 6 }, { age: 15 }, { age: 22 }]
arr.forEach(item => {
    bst.add(item)
});
let Visitor = function (){
    this.visitor = function(ele){
        console.log(ele);
        // ele.element.age *= 2
    }
}
let vis = new Visitor()
bst.preOrderTraversal(vis) // 前序遍历
// bst.inOrderTraversal() // 中序遍历
// bst.posOrderTraversal() // 后置遍历
bst.reverseTraversal() // 反转二叉树
console.dir(bst, { depth: 20 });



