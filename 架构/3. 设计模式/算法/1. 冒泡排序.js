let a = [12, 98, 32, 1001, 1, 11, 5]
function bar(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr.length - i; k++) {
            if (arr[k] > arr[k + 1]) {
                let rechange = arr[k + 1];
                arr[k + 1] = arr[k];
                arr[k] =rechange;
            }
        }

    }
    return arr
}
console.log(bar(a));