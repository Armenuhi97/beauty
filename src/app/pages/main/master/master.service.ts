import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MasterService {
    constructor(private _httpClient: HttpClient) { }

    public getMasters(offset: number) {
        return this._httpClient.get(`userdetails/user/?user_role__code=MST&limit=10&offset=${offset}`)
    }
    public getMasterById(id: number) {
        return this._httpClient.get(`userdetails/user/?user_role__code=MST&id=${id}`)
    }
    public getMasterReview(id: number, offset: number) {
        return this._httpClient.get(`timeline/review/?from_user=${id}&limit&offset=${offset}`)
    }
    public getMasterTarif(offset: number, userId: number) {
        return this._httpClient.get(`userdetails/master-tarif-subscribtion/?user=${userId}&limit=10&offset=${offset}`)
    }
    public getOrderHistory(offset: number, userId: number) {
        return this._httpClient.get(`schedule/order/?offset=${offset}&master_id=${userId}`)
    }
}