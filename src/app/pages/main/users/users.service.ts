import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UsersService {
    constructor(private _httpClient: HttpClient) { }
    public getUsers(offset: number) {
        return this._httpClient.get(`userdetails/user/?user_role__code=CL&limit=10&offset=${offset}`)
    }
    public getUserById(id: number) {
        return this._httpClient.get(`userdetails/user/?user_role__code=CL&id=${id}`)
    }
    public getClientReview(id: number, offset: number) {
        return this._httpClient.get(`timeline/review/?from_user=${id}&limit&offset=${offset}`)
    }
    public getOrderHistory(offset: number, userId: number) {
        return this._httpClient.get(`schedule/order/?offset=${offset}&user_id=${userId}`)
    }
}