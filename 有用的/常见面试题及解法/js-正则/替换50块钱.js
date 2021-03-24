// 首单享受<highLight>50</highLight>元福利  转换成 首单享受<span class='highLight'>50</span>元福利
let str = '首单享受<highLight>50</highLight>元福利'.replace(/<highLight>/g,'<span class="highLight">').replace('</highLight>','</span>')
console.log(str);