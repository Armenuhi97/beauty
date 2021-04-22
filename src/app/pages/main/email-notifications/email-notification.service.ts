import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class EmailNotificationService {
    constructor(private _httpClient: HttpClient) { }

    getEmailNotificationList(offset: number) {
        return this._httpClient.get(`notification/scheduled-email/?limit=10&offset=${offset}`)
    }

    addEmailNotificationList(body) {
        return this._httpClient.post(`notification/scheduled-email/`, body)
    }

    editEmailNotificationList(id:number,body) {
        return this._httpClient.put(`notification/scheduled-email/${id}/`, body)
    }
}