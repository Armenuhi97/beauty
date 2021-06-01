import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MetricsService {
    constructor(private _httpClient: HttpClient) { }

    public getMetrics():Observable<{ unseen_message_room_count: number }> {
        return this._httpClient.get<{ unseen_message_room_count: number }>('chat/get-unseen-message-room-count-user/');
    }
}