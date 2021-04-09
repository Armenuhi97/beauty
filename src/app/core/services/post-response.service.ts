import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class PostResponseService{
    constructor(private _httpClient: HttpClient) { }
    public acceptPost(id: number) {
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/accept-post/${id}/`, { params })
    }
  
    public cancelPost(id: number) {
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/cancel-post/${id}/`, { params })
    }
}