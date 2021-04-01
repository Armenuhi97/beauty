import { Component } from "@angular/core";
import { ServerResponse } from "@models/server-respoce";
import { Tarif } from "@models/tarif.model";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { TarifService } from "./tarif.service";

@Component({
    selector: 'app-tarif',
    templateUrl: 'tarif.component.html',
    styleUrls: ['tarif.component.scss']
})
export class TarifComponent {
    unsubscribe$ = new Subject();
    tarifs: Tarif[] = []
    public total: number;
    public pageIndex = 1;
    public pageSize = 10;

    constructor(private _tarifService: TarifService) { }

    ngOnInit() {
        this.getTarifs().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public getTarifs() {
        return this._tarifService.getTarif().pipe(map((data: ServerResponse<Tarif[]>) => {
            this.total = data.count;
            this.tarifs = data.results
        }))
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