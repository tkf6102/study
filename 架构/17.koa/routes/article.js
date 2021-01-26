const Router = require('@koa/router');
const ArticleControl = require('../control/article');
const router  = new Router({
    prefix:'/article'
});

router.get('/add',ArticleControl.get);

router.get('/remove',ArticleControl.remove);

module.exports = router;

// 一般koa实现的后台管理路由控制是两层的,不会超过三层 /user/add