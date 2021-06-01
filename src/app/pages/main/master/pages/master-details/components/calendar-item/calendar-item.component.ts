import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MasterServiceType } from "@globals/masters";
import { NzCalendarMode } from "ng-zorro-antd/calendar";
import { forkJoin, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { MasterService } from "../../../../master.service";

@Component({
    selector: 'app-calendar-item',
    templateUrl: 'calendar-item.component.html',
    styleUrls: ['calendar-item.component.scss'],
    providers: [DatePipe]
})
export class CalendarItemComponent {
    public monthOrders;
    activeService: MasterServiceType;
    dateControl = new FormControl(new Date());
    unsubscribe$ = new Subject();
    public services: MasterServiceType[] = []
    private _id: number;
    @Input('service')
    set setServices($event: MasterServiceType[]) {
        this.services = $event;

        if (this.services && this.services.length)
            this.services = this.services.map((el) => { return Object.assign(el, { busyTimes: [], workingTimes: [], isFree: false }) })
    }
    @Input('id')
    set setId($event: number) {
        this._id = $event;
        if (this._id) {
            this._combineObservable().pipe(takeUntil(this.unsubscribe$)).subscribe()
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
            this.services = this.services.map((el) => { return Object.assign(el, { busyTimes: [], workingTimes: [], isFree: false }) })
            this.activeService = null;
            return this._combineObservable()
        })).subscribe()

    }
    panelChange(evt) {
        console.log(evt);

    }
    private _combineObservable() {
        const combine = forkJoin(
            this._getMounthlyOrders(),
            this.getCalendarList()
        )
        return combine
    }
    private _getMounthlyOrders() {
        let year = this.dateControl.value.getFullYear();
        let month = this.dateControl.value.getMonth();
        let end = this._datePipe.transform(this._calculateLastDayInMonth(month, year), 'yyyy-MM-dd');
        let start = this._datePipe.transform(this._calculateFirstDayInMonth(month, year), 'yyyy-MM-dd')
        return this._masterService.getMounthlyOrders(start, end, this._id).pipe(map((data) => {
            console.log(data);
            this.monthOrders = data
        }))
    }
    formatDate(date) {
        return this._datePipe.transform(date, 'yyyy-MM-dd')
    }
    private _calculateLastDayInMonth(month: number, year: number) {
        return new Date(year, month + 1, 0);
    }
    private _calculateFirstDayInMonth(month: number, year: number) {
        return new Date(year, month, 1);
    }
    public getCalendarList() {
        let dateFormat = this._datePipe.transform(this.dateControl.value, 'yyyy-MM-dd')
        let busyArray = [];
        return this._masterService.getCalendarByDate(dateFormat, this._id).pipe(
            map((data: any) => {
                this.services = this.services.map((el) => { return Object.assign(el, { busyTimes: [], workingTimes: [], isFree: false }) })
                for (let item of data.other_events) {
                    if (item.extendedProperties.private.event_type == 'busy') {
                        busyArray.push({ start: new Date(item.start.dateTime), end: new Date(item.end.dateTime) })
                    } else {
                        if (item.extendedProperties.private.event_type == 'working') {

                            // let start = new Date(item.start.dateTime);
                            // let end: Date;
                            // for (let serviceIndex of Object.keys(item.extendedProperties.shared)) {
                            //     let filter = this.services.filter((val) => { return +val.service == +serviceIndex });
                            //     if (filter && filter[0]) {
                            //         end = new Date(start);
                            //         end.setMinutes(end.getMinutes() + filter[0].minutes);
                            //         filter[0].workingTimes.push({ start: start, end: end });
                            //         start = new Date(end);
                            //     }
                            // }
                        } else {
                            this.services = this.services.map((el) => { return Object.assign(el, { isFree: true }) })
                        }
                    }

                }

                this.services = this.services.map((el) => { return Object.assign({}, el, { busyTimes: busyArray }) });
                for (let item of data.orders) {
                    let filter = this.services.filter((val) => { return +val.service == +item.service.id });
                    if (filter && filter[0]) {
                        filter[0].busyTimes.push({ start: new Date(item.event.start.dateTime), end: new Date(item.event.end.dateTime) })

                    }
                }
            }))
    }

    selectService(service: MasterServiceType) {
        this.activeService = service;
        setTimeout(() => {
            let serviceTimes = document.getElementById('active-service');
            serviceTimes.scrollIntoView({ behavior: "smooth", block: "center" })
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
// token - d5b9179d8338f0d6733224928a66666dc7603e20
// 39c3569ae5cb4c91dcc0ae0427e7878f9da84da7    57