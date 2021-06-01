import { Component, OnInit } from '@angular/core';
import { DEFAULT_NAVIGATION_ITEMS } from '@globals/index';
import { Store } from '@ngrx/store';
import { SetSideNavItems } from '@store/side-nav/side-nav.actions';
import { SideNavState } from '@store/side-nav/side-nav.state';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MetricsService } from 'src/app/core/services/metric.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public isCollapsed: boolean = false;
  unsubscribe$ = new Subject();
  metric: { unseen_message_room_count: number };
  constructor(
    private _metricsService: MetricsService,
    private _store: Store<{ sideNav: SideNavState }>
  ) {
    _store.dispatch(SetSideNavItems({ payload: DEFAULT_NAVIGATION_ITEMS }));
  }

  ngOnInit(): void {
    this._getMetrics();
  }

  private _getMetrics(): void {
    timer(0, 10000)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(() => this._metricsService.getMetrics())
      )
      .subscribe((res:{ unseen_message_room_count: number }) => {
        this.metric = res;
      });
  }

  public toggleCollapsed(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
