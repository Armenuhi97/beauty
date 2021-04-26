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
    @Input('array')
    set setArray($event:StatisticItem[]) {
        console.log($event);
        if ($event && this.dateControl.value) {
            let statistic = $event;
            let selectMonth = this.dateControl.value.getMonth();
            let selectYear = this.dateControl.value.getFullYear();
            console.log($event);
            let end = this._datePipe.transform(this._calculateLastDayInMonth(selectMonth, selectYear), 'yyyy-MM-dd');
            let start = this._datePipe.transform(this._calculateFirstDayInMonth(selectMonth, selectYear), 'yyyy-MM-dd');
            this.lineChartLabels = statistic.map((data)=>{return data.created_at__date});
            let arr=statistic.map((data)=>{return data.count});
            this.lineChartData=[{data:arr}]
        }
    }
    lineChartData: ChartDataSets[] = []
    // [
    //     { data: [85, 72, 78, 75, 77, 75] },
    // ];

    lineChartLabels: Label[] =[]
    // = ['January', 'February', 'March', 'April', 'May', 'June'];

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
            console.log(value);
            if (value)
                this._changeDate.emit(value)
        })
    }
    private _calculateLastDayInMonth(month: number, year: number) {

        return new Date(year, month + 1, 0);
    }
    private _calculateFirstDayInMonth(month: number, year: number) {
        return new Date(year, month, 1);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}