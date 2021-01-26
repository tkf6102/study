const Router = require('@koa/router');
const UserControl = require('../control/user')// 其实就是调用的方法封装到一个类里
const router  = new Router({
    prefix:'/user'
});

router.get('/add',UserControl.get);

router.get('/remove',UserControl.remove);

module.exports = router;

// 一般koa实现的后台管理路由控制是两层的,不会超过三层 /user/add