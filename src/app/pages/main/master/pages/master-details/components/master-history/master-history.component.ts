import { Component, Input } from "@angular/core";
import { OrderItem } from "@models/order";
import { ServerResponse } from "@models/server-respoce";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { MasterService } from "../../../../master.service";

@Component({
    selector: 'app-master-history',
    templateUrl: 'master-history.component.html',
    styleUrls: ['master-history.component.scss']
})
export class MasterHistoryComponent {
    unsubscribe$ = new Subject();
    orders:OrderItem[] = [];
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

    constructor(private _masterService:MasterService) { }

    ngOnInit() { }

    public getOrders() {
        let offset = (this.pageIndex - 1) * this.pageSize;
        return this._masterService.getOrderHistory(offset, this.id).pipe(takeUntil(this.unsubscribe$),map((data: ServerResponse<OrderItem[]>) => {
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