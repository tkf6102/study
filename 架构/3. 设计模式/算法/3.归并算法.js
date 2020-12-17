let a1 = [1, 2, 3, 4, 5]
let a2 = [1.5, 2.5, 3.5]

function Merger(a, b) {
    var n = a && a.length; // a数组长度
    var m = b && b.length; // b数组长度
    var c = []; // 存一个空数组
    var i = 0, j = 0; // 两个空长度

    while (i < n && j < m) {
        if (a[i] < b[j])
            c.push(a[i++]);
        else
            c.push(b[j++]);
    }

    while (i < n)
        c.push(a[i++]);

    while (j < m)
        c.push(b[j++]);

    return c;
}
console.log(Merger(a1, a2));