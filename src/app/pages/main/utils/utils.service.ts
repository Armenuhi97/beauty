import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "@models/category";
import { ServerResponse } from "@models/server-respoce";
import { Utils } from "@models/utils";
import { Observable } from "rxjs";

@Injectable()
export class UtilsService {
    constructor(private _httpClient: HttpClient) { }
    
    public getUtils(offset: number,serviceId:number,categoryId:number): Observable<ServerResponse<Utils[]>> {
        let url=`userdetails/master-service/?limit=10&offset=${offset}`;
        if(serviceId){
            url+=`&service_id=${serviceId}`
        }
        if(categoryId){
            url+=`&service__category=${categoryId}`
        }
        return this._httpClient.get<ServerResponse<Utils[]>>(url)
    }
    getCategoriesList() {
        return this._httpClient.get<ServerResponse<Category[]>>('utils/category/')
    }
}