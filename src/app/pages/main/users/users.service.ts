import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UsersService{
    constructor(private _htttpClient:HttpClient){}
    public getUsers(offset:number){
        return this._htttpClient.get(`userdetails/user/?user_role__code=CL&linit=10&offset=${offset}`)
    }
}