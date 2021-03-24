// 所有类型只要不写,就默认是any
let numStr;
let numStr1 :string |number;
// numStr1.toString()
numStr1 = 1; // 没有赋值前,只能使用联和类型的共有方法.
numStr1.toFixed()

let Ele :Element |null = document.getElementById('app');
Ele!.innerHTML = '1'; // 强制告诉ts,这个元素肯定有
Ele as null ; // as是断言,告诉ts这个的类型是null

let a :string|number|undefined ;
(a as any)  as boolean // 双重断言,把一个属性先转换为any 再转换为其他属性,慎用.

// Ele?.innerHTML?xxx // Ele&&Ele.innerHTML&& Ele.innerHTML&&xx语法缩写

type wor = 'a' | 'b'; // 声明一种自定义类型,必须是这几种
let a1 :'a' ;