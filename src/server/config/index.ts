import  { join } from "path";
import {extend} from "lodash";
let config = {
    "viewDir": join(__dirname, "..", "views"),
    "staticDir": join(__dirname, "..", "assets"),
};


if (process.env.NODE_ENV == "development") {
    const localConfig = {
        baseUrl:"http://127.0.0.1:8080/yideng_book/web/index.php?r=",
        cacheMode:false,
        port: 3000
    };
    config = extend(config, localConfig);
}

if (process.env.NODE_ENV == "production") {
    const prodConfig = {
        cacheMode:"memory",
        port: 8081
    };
    config = extend(config, prodConfig);
}


export default config;
