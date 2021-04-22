import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationModel } from "@models/notification";
import { ServerResponse } from "@models/server-respoce";

@Injectable()
export class PushNotificationService {
    constructor(private _httpClient: HttpClient) { }

    getPushNotificationList(offset: number) {
        return this._httpClient.get<ServerResponse<NotificationModel[]>>(`notification/scheduled-notification/?limit=10&offset=${offset}`)
    }
    addPushNotificationList(body: NotificationModel) {
        return this._httpClient.post(`notification/scheduled-notification/`, body)
    }

    editPushNotificationList(id: number, body: NotificationModel) {
        return this._httpClient.put(`notification/scheduled-notification/${id}/`, body)
    }
}