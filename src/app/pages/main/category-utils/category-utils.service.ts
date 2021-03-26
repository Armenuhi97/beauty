import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, Service } from "@models/category";
import { ServerResponse } from "@models/server-respoce";

@Injectable()
export class CategoryUtilsService {
    constructor(private _httpClient: HttpClient) { }
    getCategoriesList() {
        return this._httpClient.get<ServerResponse<Category[]>>('utils/category/')
    }
    addCategory(body: Category) {
        return this._httpClient.post('utils/category/', body)
    }
    addService(body: Service) {
        return this._httpClient.post('utils/service/', body)
    }

    editCategory(id: number, body: Category) {
        return this._httpClient.put(`utils/category/${id}/`, body)
    }
    editService(id: number, body: Service) {
        return this._httpClient.put(`utils/service/${id}/`, body)
    }

    deleteCategory(id: number) {
        return this._httpClient.delete(`utils/category/${id}/`)
    }
    deleteService(id: number) {
        return this._httpClient.delete(`utils/service/${id}/`)
    }
    
}