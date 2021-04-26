import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { StatisticItem } from "@globals/statistic";
import { forkJoin, Subject } from "rxjs";
import { map, take, takeUntil } from "rxjs/operators";
import { StatisticsService } from "../../statistics.service";

@Component({
  selector: 'app-statistic-item',
  templateUrl: 'statistic-item.component.html',
  styleUrls: ['statistic-item.component.scss'],
  providers: [DatePipe]
})
export class StatisticItemComponent {
  jondedMasterSatistics:StatisticItem[]=[]
  unsubscribe$ = new Subject();

  constructor(private _statisticService: StatisticsService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this._combineObservable()
  }
  private _calculateLastDayInMonth(month: number, year: number) {

    return new Date(year, month + 1, 0);
  }
  private _calculateFirstDayInMonth(month: number, year: number) {
    return new Date(year, month, 1);
  }
  private _combineObservable() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let end = this._datePipe.transform(this._calculateLastDayInMonth(currentMonth, currentYear), 'yyyy-MM-dd');
    let start = this._datePipe.transform(this._calculateFirstDayInMonth(currentMonth, currentYear), 'yyyy-MM-dd');

    const combine = forkJoin(
      this.getJoinedUser(start, end, 'MST')
    )
    combine.pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  changeDate($event, type: string) {
    if ($event) {
      let date = $event
      let selectMonth = date.getMonth();
      let selectYear = date.getFullYear();
      console.log($event);
      let end = this._datePipe.transform(this._calculateLastDayInMonth(selectMonth, selectYear), 'yyyy-MM-dd');
      let start = this._datePipe.transform(this._calculateFirstDayInMonth(selectMonth, selectYear), 'yyyy-MM-dd');
      switch (type) {
        case 'joinMST': {
          this.getJoinedUser(start, end, 'MST').pipe(takeUntil(this.unsubscribe$)).subscribe()
          break;
        }
      }
    }
  }
  public getJoinedUser(start, end, role) {
    return this._statisticService.getJoinedUsers(start, end, role).pipe(
      map((data:StatisticItem[])=>{
        console.log(data);
        this.jondedMasterSatistics=data
      })
    )
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}