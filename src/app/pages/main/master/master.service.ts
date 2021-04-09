import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MasterService {
    constructor(private _htttpClient: HttpClient) { }

    public getMasters(offset: number) {
        return this._htttpClient.get(`userdetails/user/?user_role__code=MST&limit=10&offset=${offset}`)
    }
    public getMasterById(id: number) {
        return this._htttpClient.get(`userdetails/user/?user_role__code=MST&id=${id}`)
    }
    public getMasterReview(id: number, offset: number) {
        return this._htttpClient.get(`timeline/review/?from_user=${id}&limit&offset=${offset}`)
    }
    public getMasterTarif(offset: number, userId: number) {
        return this._htttpClient.get(`userdetails/master-tarif-subscribtion/?user=${userId}&limit=10&offset=${offset}`)
    }
}