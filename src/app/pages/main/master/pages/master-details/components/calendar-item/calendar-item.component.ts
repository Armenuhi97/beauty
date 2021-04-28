import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Service } from "@models/category";
import { NzCalendarMode } from "ng-zorro-antd/calendar";
import { Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { MasterService } from "../../../../master.service";

@Component({
    selector: 'app-calendar-item',
    templateUrl: 'calendar-item.component.html',
    styleUrls: ['calendar-item.component.scss'],
    providers: [DatePipe]
})
export class CalendarItemComponent {
    dateControl = new FormControl(new Date());
    unsubscribe$ = new Subject();
    public services=[]
    private _id: number;
    @Input('service')
    set setServices($event: any[]) {
        this.services = $event;
        console.log(this.services);
        
    }
    @Input('id')
    set setId($event) {
        this._id = $event;
        if (this._id) {
            this.getCalendarList().pipe(takeUntil(this.unsubscribe$)).subscribe()
            // this.getOrders()
        }
    }
    mode: NzCalendarMode = 'month';

    constructor(private _masterService: MasterService,
        private _datePipe: DatePipe) { }

    ngOnInit() {
        this.subscribeToDateChange()
     }
    subscribeToDateChange() {
        this.dateControl.valueChanges.pipe(takeUntil(this.unsubscribe$), switchMap(() => {
            return this.getCalendarList()
        })).subscribe()

    }
    panelChange(evt) {
        console.log(evt);

    }
    public getCalendarList() {
        let dateFormat = this._datePipe.transform(this.dateControl.value,'yyyy-MM-dd')
        return this._masterService.getCalendarByDate(dateFormat, this._id).pipe(
            map((data) => {
                console.log(data);

            }))
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}