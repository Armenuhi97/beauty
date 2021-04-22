import { Component, Input } from "@angular/core";
import { ServerResponse } from "@models/server-respoce";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { UsersService } from "../../../../users.service";

@Component({
    selector: 'app-user-history',
    templateUrl: 'user-history.component.html',
    styleUrls: ['user-history.component.scss']
})
export class UserHistoryComponent {
    unsubscribe$ = new Subject();
    orders = [];
    public id: number;
    public total: number;
    public pageIndex = 1;
    public pageSize = 10;

    @Input('id')
    set setId($event) {
        this.id = $event;
        if (this.id) {
            this.getOrders()
        }
    }

    constructor(private _userService: UsersService) { }

    ngOnInit() { }

    public getOrders() {
        let offset = (this.pageIndex - 1) * this.pageSize;
        return this._userService.getOrderHistory(offset, this.id).pipe(takeUntil(this.unsubscribe$),map((data: ServerResponse<any[]>) => {
            this.total = data.count;
            this.orders = data.results
        })).subscribe()
    }

    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this.getOrders()
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}