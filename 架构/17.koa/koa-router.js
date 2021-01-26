class Router {
    constructor() {
        this.arr = []
    }
    get(path, handler) {
        this.arr.push({
            path,
            handler,
            method: 'GET'
        })
    }
    compose(matchRoutes,ctx,next) {
        const dispatch = (index) => {
            if (index == matchRoutes.length) return  next();
            let middleWare = matchRoutes[index]
            return  middleWare(ctx,()=>{dispatch(index+1)})
            // matchRoutes.forEach( async layer => {
            //     await layer.handler()
            // });
        };
        return dispatch(0)
    }
    routes() {
        return async (ctx, next) => { // 因为最后放在use里,一定是个async函数
            let matchRoutes = this.arr.filter(layer => {
                return ctx.method === layer.method && ctx.path === layer.path
            });
            matchRoutes.map(item=>{
                return item.handler
            })
            this.compose(matchRoutes.map(item=>{ // 因为需要的是操作函数,所以直接映射过去这个数组就好了
                return item.handler
            }), ctx,next) // next是本中间件的next
        }
    }
};
module.exports = Router;