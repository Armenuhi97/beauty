import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DEFAULT_MASTERS } from '@globals/index';
import { IUser, ServerResponse } from '@models/index';
import { Store } from '@ngrx/store';
import { BreadCrumbState } from '@store/breadcrumb/breadcrumb.state';
import { SetMasters } from '@store/masters/masters.actions';
import { selectMasters } from '@store/masters/masters.selectors';
import { MastersState } from '@store/masters/masters.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MasterComponent implements OnInit {
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  masters:IUser[] = []
  constructor(private _mesterService: MasterService) { }

  ngOnInit(): void {
    this.getUsersList()
  }
  public getUsersList() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    this._mesterService.getMasters(offset).pipe(takeUntil(this.unsubscribe$)).subscribe((data: ServerResponse<IUser[]>) => {
      this.total = data.count;
      this.masters=data.results
    })
  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getUsersList()
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
