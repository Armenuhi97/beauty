import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reviews } from '@models/review';
import { ServerResponse } from '@models/server-respoce';
import { IUser } from '@models/users';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { MasterService } from '../../master.service';

@Component({
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css'],
  providers:[DatePipe]
})
export class MasterDetailsComponent implements OnInit {
  unsubscribe$ = new Subject();
  public id: number;
  master: IUser;
  reviews = [];
  public pageIndex = 1;
  public pageSize = 10;
  total: number;
  constructor(private route: ActivatedRoute,
    private _masterService: MasterService) {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
  }
  ngOnInit() {
    this._getInfo()
  }
  changeTab($event) {
    if ($event.index == 0)
      this._getInfo()
    if ($event.index == 1)
      this._getMasterReview();
      if($event.index == 2){

      }
  }
  private _getMasterReview() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    this._masterService.getMasterReview(this.id, offset).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data: ServerResponse<Reviews[]>) => {
      this.reviews = data.results;
      this.total = data.count
    })
  }
  private _getInfo() {
    this._masterService.getMasterById(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe((data: ServerResponse<IUser[]>) => {
      if (data.count) {
        this.master = data.results[0]
      }
    })
  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this._getMasterReview()
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
