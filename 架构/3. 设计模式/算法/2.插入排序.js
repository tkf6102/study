function Insertion(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
      preIndex = i - 1;
      current = arr[i];
      while (preIndex >= 0 && current < arr[preIndex]) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--;
      }
      arr[preIndex + 1] = current;
    }
    return arr;
  }
   
   
  var arr = [12, 98, 32, 1001, 1, 11, 5];
  Insertion(arr);