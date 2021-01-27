const Router = require('@koa/router');
const UserControl = require('../control/user')// 其实就是调用的方法封装到一个类里
const router  = new Router({
    prefix:'/user'
});

// 后端设计为post请求,前端访问就需要使用post请求,不然就是method Not Allowed
router.post('/add',UserControl.get);

router.get('/remove',UserControl.remove);

module.exports = router;

// 一般koa实现的后台管理路由控制是两层的,不会超过三层 /user/add