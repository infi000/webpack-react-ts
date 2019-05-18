import {IIndex} from "../interface/IIndex"
import {Model} from "../models/User"
import {provide,TYPES,TAGS,inject} from "../ioc/ioc"

@provide(TAGS.IndexService)

export class IndexService implements IIndex{
    private safeRequest;

    constructor(@inject(TYPES.SafeRequest) safeRequest){
        this.safeRequest=safeRequest;
    }
    //私有变量  model.user后面跟数组是因为多个符合接口的对象用数组包含起来   
    private userStorage : Model.User[] = [
        {
            email:"xxxxxxx@qq.com",
            name:"老王"
        },
        {
            email:"ssssssss@qq.com",
            name:"老张"
        },
    ];
    public getUser(id:string) : Model.User{
        let result:Model.User;
        result = this.userStorage[id];
        return result;
    };
    /**
     * test
     */
    public test() {
        let res;
        const url ="http://127.0.0.1:8081/data.json";
        const arg = {};
        // const cb=(d)=>{
        //   return   res=d;
        // }
        res = this.safeRequest.fetch(url,arg)

        return res
    }

}