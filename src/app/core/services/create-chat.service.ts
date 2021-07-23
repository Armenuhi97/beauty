import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateRoomResponse } from "@models/create-room";

@Injectable({ providedIn: 'root' })
export class CreateChatService {
    constructor(private _httpClient: HttpClient) { }
    
    public createChat(id: number) {
        return this._httpClient.get<CreateRoomResponse>(`chat/get-room-for-admin/${id}/`);
    }
}