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
            let days = this.getDaysInMonth(selectMonth, selectYear, 'yyyy-MM-dd');
            this.lineChartLabels = this.getDaysInMonth(selectMonth, selectYear, 'dd');
            let arr = []
            for (let d of days) {
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
            this.lineChartData = [{ data: arr, label: this.title }]
        }
    }
    lineChartData: ChartDataSets[] = []

    lineChartLabels: Label[] = []

    lineChartOptions = {
        responsive: true,
        // options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min:0
                    }
                }]
            }
        // }
    };

    lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,255,0,0.28)',
        },
    ];

    lineChartLegend = false;
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

    getDaysInMonth(month, year, format) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(this._datePipe.transform(new Date(date), format));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}