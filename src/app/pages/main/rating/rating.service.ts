import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reviews } from "@models/review";
import { ServerResponse } from "@models/server-respoce";

@Injectable()
export class RatingService {
        constructor(private _httpClient:HttpClient){}
    public getRatingList(offset:number,status?:string){        
        let params = new HttpParams().set('authorization', 'true');
        let url=`timeline/review/?limit=10&offset=${offset}`;
        if (status && status !== 'all') {
            url += `&status=${status}`
        }
        return this._httpClient.get<ServerResponse<Reviews[]>>(url,{ params })
    }

    public acceptRating(id:number){
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/accept-review/${id}/`,{params})
    }
    public cancelRating(id:number){
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/cancel-review/${id}/`,{params})
    }
 }