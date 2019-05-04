const errorHandler = {
    error(app, logger) {
        //最入门的捕获错误返回500
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                console.log("cuowu xinxi ",err)
                logger.error(err);
                ctx.status = 500;
                ctx.body = err;
            }
        });
        //404
        app.use(async (ctx, next) => {
            await next();
            if (ctx.status != 404) {
                return;
            }
            console.log(ctx)
            ctx.status = 404;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
        });
    }
}


export default  errorHandler;