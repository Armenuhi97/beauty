import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StatusService {
    statusList = [
        { key: 'all', text: 'STATUS.ALL' },
        { key: 'pending', text: 'STATUS.PENDING' },
        { key: 'canceled', text: 'STATUS.CANCELED' },
        { key: 'accepted', text: 'STATUS.ACCEPTED' },
    ]
    getStatusList() {
        return this.statusList
    }
}