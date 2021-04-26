import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class StatisticsService {
    constructor(private _httpClient: HttpClient) { }

    public getJoinedUsers(start: string, end: string, role: string) {
        return this._httpClient.post('statistic/joined-user/', {
            "start_date": start,
            "end_date": end,
            "role": role
        })
    }
    public getStatisticPost(start: string, end: string) {
        return this._httpClient.post('statistic/post/', {
            "start_date": start,
            "end_date": end
        })
    }
    public getStatisticPostComment(start: string, end: string) {
        return this._httpClient.post('statistic/post-comment/', {
            "start_date": start,
            "end_date": end
        })
    }
    public getStatisticOrder(start: string, end: string) {
        return this._httpClient.post('statistic/order/', {
            "start_date": start,
            "end_date": end
        })
    }
    public getStatisticMasterService(start: string, end: string) {
        return this._httpClient.post('statistic/master-service/', {
            "start_date": start,
            "end_date": end
        })
    }
}