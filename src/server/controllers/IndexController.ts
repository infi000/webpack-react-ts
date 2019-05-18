import {
    controller,
    interfaces,
    Router,
    httpGet,
    inject,
    provideThrowable,
    TYPE,
    TAGS
} from "../ioc/ioc";
// 1. Router.IRouterContext 2.interfaces.Controller 3.@inject(TAGS.IndexService)
@controller("/api")
//拦截器
@provideThrowable(TYPE.Controller, "IndexController")
export default class IndexController implements interfaces.Controller {
    private indexService;
    constructor(@inject(TAGS.IndexService) indexService) {
        this.indexService = indexService;
    }
    @httpGet("/")
    private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
      const result = this.indexService.getUser(1);
        ctx.body = await result;
    }

    @httpGet("/test")
    private async test(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        const result = this.indexService.test();
    
        console.log("🍎",await result)

        ctx.body = await result;

    }
}
