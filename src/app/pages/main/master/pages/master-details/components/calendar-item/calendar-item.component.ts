import { Component, Input } from "@angular/core";
import { NzCalendarMode } from "ng-zorro-antd/calendar";
import { Subject } from "rxjs";

@Component({
    selector: 'app-calendar-item',
    templateUrl: 'calendar-item.component.html',
    styleUrls: ['calendar-item.component.scss']
})
export class CalendarItemComponent {
    date;
    unsubscribe$ = new Subject();
    private _id: number;
    @Input('id')
    set setId($event) {
        this._id = $event;
        if (this._id) {
            // this.getOrders()
        }
    }
    mode: NzCalendarMode = 'month';

    constructor() { }

    ngOnInit() { }
    panelChange(evt){
        console.log(evt);
        
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}