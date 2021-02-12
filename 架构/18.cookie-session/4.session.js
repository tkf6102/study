// 记录访问服务器用户的数量 每次访问+1
const Koa = require('koa');
const Router = require('koa-router');
const uuid = require('uuid')
const app = new Koa();
const router = new Router();
app.keys = ['tkf']; // router会调用本身身上的.keys属性,根据属性自动添加签名; 而且是个数组


const session = {} // 就是内存中的对象,但是项目重启会消失.所以后期会放到redis或者mongo里的   
const cardName = 'connect.sid'; // 
router.get('/visit',async function(ctx){
    let cardId = ctx.cookies.get(cardName); 
    if(cardId && session[cardId]){
        session[cardId].money -= 20;

        ctx.body = `您的余额是${session[cardId].money}元`

    }else{
        cardId = uuid.v4(); // 1. 新建一个随机数： 基于mac地址 时间戳等 2. 新建的表单会给他一个新的随机数,不然会一直调用之前的值
        session[cardId] = {money:200};
        ctx.cookies.set(cardName,cardId,{maxAge:5*1000})
        ctx.body = `您好,新会员,您的余额是${session[cardId].money}`
        
    }

})
app.use(router.routes())
app.listen(3000,function(){
    console.log('start');
})