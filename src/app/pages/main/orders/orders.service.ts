import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "@models/category";
import { ServerResponse } from "@models/server-respoce";

@Injectable()
export class OrdersService{
    constructor(private _httpClient:HttpClient){}
    public getOrders(offset:number,category,service,status){
        let url=`schedule/order/?offset=${offset}` 

        if(category){
            url+=`&category_id=${category}`
        }
        if(service){
            url+=`&service_id=${service}`
        }
        if(status){
            url+=`&status=${status}`
        }
       return this._httpClient.get(url)
    }
    getCategoriesList() {
        return this._httpClient.get<ServerResponse<Category[]>>('utils/category/')
    }
}