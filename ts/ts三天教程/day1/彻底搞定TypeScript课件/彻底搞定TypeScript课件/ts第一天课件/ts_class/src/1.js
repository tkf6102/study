"use strict";
// namespace a{
Object.defineProperty(exports, "__esModule", { value: true });
// }
var num = 10;
var str = 'Ts,得劲儿';
// let bool:boolean = true;
// str = 0;
// bool = '';
// let u:null = null;
// let u: undefined | number = undefined;
// u = 12;
// let ary:Array<number> = [1,3,4];
// let ary2:number[] = [5,6,7];
// let ary3:string[] = ['1','2'];
// let ary:[string,number] = ['呵呵哒',1];
// let ary2:any = [1,true,[[[[[]]]]]];
function getState(code) {
    if (code === 0) {
        return 'success';
    }
    else if (code === 1) {
        return 'fail';
    }
    else if (code === 2) {
        return 'upload';
    }
}
console.log(getState(0));
