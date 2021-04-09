import { Component, Input } from "@angular/core";
import { BuyTarif } from "@models/buy-tarif";
import { ServerResponse } from "@models/server-respoce";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MasterService } from "../../../../master.service";

@Component({
    selector: 'app-master-tarif',
    templateUrl: './master-tarif.component.html',
    styleUrls: ['master-tarif.component.scss']
})
export class MasterTarifComponent {
    private _id: number;
    tarifs: BuyTarif[] = [];
    public pageIndex = 1;
    public pageSize = 10;
    unsubscribe$ = new Subject();
    total: number;
    @Input('id')
    set setId($event: number) {
        this._id = $event;
        if (this._id) {
            this.getBuyTaris()
        }
    }
    constructor(private _masterService: MasterService) { }

    ngOnInit() { }

    getBuyTaris() {
        const offset = (this.pageIndex - 1) * this.pageSize;
        this._masterService.getMasterTarif(offset, this._id).pipe(takeUntil(this.unsubscribe$)).subscribe((data: ServerResponse<BuyTarif[]>) => {
            this.tarifs = data.results;
            this.total = data.count
        })
    }
    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this.getBuyTaris()
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}