import { InversifyKoaServer } from "inversify-koa-utils";
import { Container, buildProviderModule } from "./ioc/ioc";
import historyApiFallback from 'koa2-connect-history-api-fallback';

import "reflect-metadata";
import "./ioc/loader";
import errorHandler from "./util/errorHandler";
import * as log4js from "log4js";
// import { join } from "path";
// import co from "co";
// import * as render from 'koa-swig';
import * as serve from "koa-static";
import config from "./config/index";

//日志 逻辑和业务错误 HTTP日志
log4js.configure({
  appenders: {
    koa_app: {//名字
      type: "file",
      filename: "logs/koa_app.log"
    }
  },
  categories: {
    default: {
      appenders: ["koa_app"],
      level: "error"
    }
  }
});
const logger = log4js.getLogger("koa_app");

const container = new Container();


// console.log("container", container)
//如何加载资源
container.load(buildProviderModule());

let server = new InversifyKoaServer(container);

server.setConfig(app => {
  //静态资源

  // app.context.render = co.wrap(render({
  //   root: join(config.viewDir),
  //   autoescape: true,
  //   cache: config.cacheMode, // 浏览器缓存 在开发阶段设置false(因为要经常修改前端页面) 上线后为memory 
  //   ext: 'html',
  //   writeBody: false
  // }));

    app.use(historyApiFallback({ 
      whiteList: ['/api']
  }));
  app.use(serve(config.staticDir));
}).setErrorConfig(app => {
  //容错
  errorHandler.error(app, logger);

})

let app = server.build();
app.listen(3000, () => {
  console.log("启动成功,http://127.0.0.1:3000")
});