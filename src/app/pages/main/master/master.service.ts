import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MasterService{
    constructor(private _htttpClient:HttpClient){}

    public getMasters(offset:number){
        return this._htttpClient.get(`userdetails/user/?user_role__code=MST&linit=10&offset=${offset}`)
    }
}