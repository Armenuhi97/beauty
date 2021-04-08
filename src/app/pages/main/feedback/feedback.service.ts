import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class FeedbackService {
    constructor(private _httpClient: HttpClient) { }
    getFeedBacks(offset: number, isAnswered, role: string) {
        let url = `userdetails/help-message/?offset=${offset}`
        if (isAnswered || isAnswered == 0) {
            url += `&is_answered=${isAnswered}`
        }
        if (role) {
            url += `&user__user_role__code=${role}`
        }

        return this._httpClient.get(url)
    }
}