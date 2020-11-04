import sum from './sum'
import './index.css'
import url from './timg.jpg'
let oImg = new Image()
oImg.src = url;
document.body.appendChild(oImg)
console.log(sum(10,20));


// let xhr = new XMLHttpRequest();
// xhr.open('get','/api/user',true)
// xhr.onreadystatechange = function(){
//   console.log(xhr.response);
// }
// xhr.send()