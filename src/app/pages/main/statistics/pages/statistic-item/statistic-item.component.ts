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
  jondedMasterStatistics: StatisticItem[] = [];
  jondedClientStatistics: StatisticItem[] = []

  unsubscribe$ = new Subject();
  postStatistic: StatisticItem[] = [];
  commentStatistic:StatisticItem[]=[];
  orderStatistic:StatisticItem[]=[];
  masterServiceStatistic: StatisticItem[]=[]
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
      this.getJoinedUser(start, end, 'MST'),
      this.getJoinedUser(start, end, 'CL'),

      this.getPostStatistic(start, end),
      this.getCommentStatistic(start,end),
      this.getOrderStatistic(start, end),
      this.getMasterServiseStatistic(start,end)
    )
    combine.pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  changeDate($event, type: string) {
    if ($event) {
      let date = $event
      let selectMonth = date.getMonth();
      let selectYear = date.getFullYear();
      let end = this._datePipe.transform(this._calculateLastDayInMonth(selectMonth, selectYear), 'yyyy-MM-dd');
      let start = this._datePipe.transform(this._calculateFirstDayInMonth(selectMonth, selectYear), 'yyyy-MM-dd');
      switch (type) {
        case 'joinMST': {
          this.getJoinedUser(start, end, 'MST').pipe(takeUntil(this.unsubscribe$)).subscribe()
          break;
        }
        case 'joinCL': {
          this.getJoinedUser(start, end, 'CL').pipe(takeUntil(this.unsubscribe$)).subscribe()
          break;
        }
        case 'post': {
          this.getPostStatistic(start, end).pipe(takeUntil(this.unsubscribe$)).subscribe()
          break
        }
        case 'comment': {
          this.getCommentStatistic(start, end).pipe(takeUntil(this.unsubscribe$)).subscribe()
          break
        }
        case 'order': {
          this.getOrderStatistic(start, end).pipe(takeUntil(this.unsubscribe$)).subscribe()
          break
        }
        case 'service': {
          this.getMasterServiseStatistic(start, end).pipe(takeUntil(this.unsubscribe$)).subscribe()
          break
        }
      }
    }
  }
  public getJoinedUser(start:string, end:string, role:string) {
    return this._statisticService.getJoinedUsers(start, end, role).pipe(
      map((data: StatisticItem[]) => {
        if (role == 'MST') {
          this.jondedMasterStatistics = data
        } else {
          this.jondedClientStatistics = data
        }
      })
    )
  }
  public getPostStatistic(start:string, end:string) {
    return this._statisticService.getStatisticPost(start, end).pipe(
      map((data: StatisticItem[]) => {
        this.postStatistic = data
      })
    )
  }
  public getCommentStatistic(start:string, end:string) {
    return this._statisticService.getStatisticPostComment(start, end).pipe(
      map((data: StatisticItem[]) => {
        this.commentStatistic = data
      })
    )
  }

    public getOrderStatistic(start:string, end:string) {
    return this._statisticService.getStatisticOrder(start, end).pipe(
      map((data: StatisticItem[]) => {
        this.commentStatistic = data
      })
    )
  }
  public getMasterServiseStatistic(start:string, end:string) {
    return this._statisticService.getStatisticMasterService(start, end).pipe(
      map((data: StatisticItem[]) => {
        this.masterServiceStatistic = data
      })
    )
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}