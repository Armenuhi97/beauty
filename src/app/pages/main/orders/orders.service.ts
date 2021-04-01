import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "@models/category";
import { ServerResponse } from "@models/server-respoce";

@Injectable()
export class OrdersService{
    constructor(private _httpClient:HttpClient){}
    public getOrders(){
        return this._httpClient.get('')
    }
    getCategoriesList() {
        return this._httpClient.get<ServerResponse<Category[]>>('utils/category/')
    }
}