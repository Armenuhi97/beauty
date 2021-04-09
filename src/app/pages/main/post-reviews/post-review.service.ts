import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "@models/post";
import { ServerResponse } from "@models/server-respoce";

@Injectable()
export class PostReviewService {
    constructor(private _httpClient: HttpClient) { }
    getComments(offset: number, status: string) {
        let url = `timeline/post-comment/?offset=${offset}`
        if (status && status !== 'all') {
            url += `&status=${status}`
        }
       
        return this._httpClient.get(url)
    }
    
    public acceptComment(id:number){
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/accept-comment/${id}/`,{params})
    }
    public cancelComment(id:number){
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/cancel-comment/${id}/`,{params})
    }
 
}