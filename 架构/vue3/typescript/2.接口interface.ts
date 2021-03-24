// interface用来描述对象形状的 指定传入参数的值都是什么类型

// I开头一般是后台语言
interface ISchool {
    readonly name: string, // 只读属性
    age: number,
    address?: string // 非必填
}

let school: ISchool = {
    name: 'school',
    age: 1,
    // address: 'qq'
}
// school.name =1 // 会报错,只读属性
// 接口可以拓展,就是es6继承 相当于既有ISchool和IZhufeng的双属性
interface IZhufeng extends ISchool {
    type: string,
    // [key:string]:any // 拓展为键是字符串,值是任意类型,而且不限数量,就相当于随便填写了,所以不建议使用
    phone?: number
}

const obj: IZhufeng = {
    ...school, // 可以运动拓展运算符
    type: '培训',

}

// 类型断言 表示这个对象就是这个类型 属性溢出用断言,但是属性缺失还是报错. 可多不可少
let school2: ISchool = ({
    name: 'school',
    age: 1,
    sex:1 // 因为接口里没设置这个值,所以单独使用报错. 使用类型断言就不报错
}) as ISchool