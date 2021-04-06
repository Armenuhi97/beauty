import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "@models/category";
import { ServerResponse } from "@models/server-respoce";
import { Utils } from "@models/utils";
import { Observable } from "rxjs";

@Injectable()
export class UtilsService {
    constructor(private _httpClient: HttpClient) { }
    
    public getUtils(offset: number): Observable<ServerResponse<Utils[]>> {
        return this._httpClient.get<ServerResponse<Utils[]>>(`userdetails/master-service/?limit=10&offset=${offset}`)
    }
    getCategoriesList() {
        return this._httpClient.get<ServerResponse<Category[]>>('utils/category/')
    }
}