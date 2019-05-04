import {Model} from "../Models/User";



export interface IIndex {
    getUser(id:string):Model.User;
}