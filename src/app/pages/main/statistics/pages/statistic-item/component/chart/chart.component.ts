import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { StatisticItem } from "@globals/statistic";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({
    selector: 'app-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ChartComponent {
    unsubscribe$ = new Subject();
    @Output('changeDate') private _changeDate = new EventEmitter()
    dateControl = new FormControl(new Date());
    title: string;
    @Input('title')
    set setTitle($event) {
        this.title = $event
    }
    @Input('array')
    set setArray($event: StatisticItem[]) {
        if ($event && this.dateControl.value) {
            let statistic = $event;
            let selectMonth = this.dateControl.value.getMonth();
            let selectYear = this.dateControl.value.getFullYear();
            this.lineChartLabels = this.getDaysInMonth(selectMonth, selectYear)
            let arr = []
            for (let d of this.lineChartLabels) {
                if (statistic && statistic.length) {
                    let item = statistic.filter((el) => { return el.created_at__date == d })
                    if (item && item[0]) {
                        let index = statistic.indexOf(item[0])
                        arr.push(statistic[index].count)
                    } else {
                        arr.push(0)
                    }
                } else {
                    arr.push(0)
                }
            }
            this.lineChartData = [{ data: arr,label:'' }]
        }
    }
    lineChartData: ChartDataSets[] = []

    lineChartLabels: Label[] = []

    lineChartOptions = {
        responsive: true,
    };

    lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,255,0,0.28)',
        },
    ];

    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';

    constructor(private _datePipe: DatePipe) { }

    ngOnInit() {
        this.subscribeToDateChange()
    }

    subscribeToDateChange() {
        this.dateControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
            if (value)
                this._changeDate.emit(value)
        })
    }

    getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(this._datePipe.transform(new Date(date), 'yyyy-MM-dd'));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}