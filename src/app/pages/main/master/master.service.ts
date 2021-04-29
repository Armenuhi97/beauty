import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterServiceType } from "@globals/masters";
import { ServerResponse } from "@models/server-respoce";
import { Observable } from "rxjs";

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
    public getServices(userId: number): Observable<ServerResponse<MasterServiceType[]>> {
        return this._httpClient.get<ServerResponse<MasterServiceType[]>>(`userdetails/master-service/?user_id=${userId}&limit=100000`)
    }
    public getCalendarByDate(date: string, masterId: number) {
        return this._httpClient.post(`schedule/get-calendar-by-date/`, {
            "date": date,
            "master_id": +masterId
        })
    }
    public getMounthlyOrders(start:string,end:string,masterId:number) {
        return this._httpClient.post('schedule/get-monthly-orders/', {
            "start_date": start,
            "end_date": end,
            "master_id": masterId
        })
    }
}