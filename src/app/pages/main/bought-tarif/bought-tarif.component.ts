import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { BuyTarif } from "@models/buy-tarif";
import { Category } from "@models/category";
import { ServerResponse } from "@models/server-respoce";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { BoughtTarifService } from "./bought-tarif.service";

@Component({
    selector: 'app-bought-tarif',
    templateUrl: 'bought-tarif.component.html',
    styleUrls: ['bought-tarif.component.scss'],
    providers: [DatePipe]
})
export class BougthTarifComponent {
    totalSum: number;
    unsubscribe$ = new Subject();
    public tarifs:BuyTarif[] = []
    public total: number;
    public pageIndex = 1;
    public pageSize = 10;
    selectItems = [];
    categories: Category[] = [];

    constructor(private _boughtTarifService: BoughtTarifService, private _fb: FormBuilder) { }

    ngOnInit() {
        this.initSelectItems()
        this.getTarifs().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }

    initSelectItems() {
        for (let i = 0; i < 12; i++) {
            this.selectItems.push(i + 1)
        }
    }

    public getTarifs(sign?: string) {
        const offset = (this.pageIndex - 1) * this.pageSize;

        return this._boughtTarifService.getBoughtTarifs(offset, sign).pipe(map((data: ServerResponse<any[]>) => {
            this.totalSum = data.sum
            this.total = data.count;
            this.tarifs = data.results
        }))
    }


    sort(sort): void {
        if (sort == 'ascend') {
            this.pageIndex = 1;
            this.getTarifs('+').pipe(takeUntil(this.unsubscribe$)).subscribe()
        } else {
            if (sort == 'descend') {
                this.pageIndex = 1;
                this.getTarifs('-').pipe(takeUntil(this.unsubscribe$)).subscribe()
            } else {
                this.pageIndex = 1;
                this.getTarifs().pipe(takeUntil(this.unsubscribe$)).subscribe()
            }
        }
    }

    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this.getTarifs().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}