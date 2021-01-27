 class User{
    async get(ctx,next){
        // 前端表单是不涉及跨域问题的
        ctx.body = {
            a:1,
            b:2
        }
    }
    async remove(ctx,next){
        ctx.body = 'user remove'
    }
}
module.exports = new User()