import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "@models/post";
import { PostComment } from "@models/post-comment";
import { ServerResponse } from "@models/server-respoce";

@Injectable()
export class PostService {
    constructor(private _httpClient: HttpClient) { }
    public getPostList(offset: number, status?: string) {
        let params = new HttpParams().set('authorization', 'true');
        let url = `timeline/post/?limit=10&offset=${offset}`;
        if (status && status !== 'all') {
            url += `&status=${status}`
        }
        return this._httpClient.get<ServerResponse<Post[]>>(url, { params })
    }
    public getPostById(id: number) {
        return this._httpClient.get(`timeline/post/${id}/`)
    }
    public acceptPost(id: number) {
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/accept-post/${id}/`, { params })
    }
    public getPostCommet(postId: number,offset:number) {
        // &status=accepted
        return this._httpClient.get<ServerResponse<PostComment[]>>(`timeline/post-comment/?post=${postId}&limit=10&offset=${offset}&status=accepted`)
    }
    public cancelPost(id: number) {
        let params = new HttpParams().set('authorization', 'true');
        return this._httpClient.get(`timeline/cancel-post/${id}/`, { params })
    }
}