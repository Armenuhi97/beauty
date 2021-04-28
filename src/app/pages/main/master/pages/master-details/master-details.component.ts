import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '@models/category';
import { Reviews } from '@models/review';
import { ServerResponse } from '@models/server-respoce';
import { IUser } from '@models/users';
import { forkJoin } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MasterService } from '../../master.service';

@Component({
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css'],
  providers: [DatePipe]
})
export class MasterDetailsComponent implements OnInit {
  unsubscribe$ = new Subject();
  public id: number;
  master: IUser;
  reviews = [];
  public pageIndex = 1;
  public pageSize = 10;
  total: number;
  services: any[] = []
  constructor(private route: ActivatedRoute,
    private _masterService: MasterService) {

  }
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribe$),
    switchMap((params)=>{
      this.id = params['id'];
     return this._combineObservable()
    })).subscribe();
  }
  private _combineObservable() {
    const combine = forkJoin(
      this._getInfo(),
      this.getServices()
    )
   return combine
    } 
  changeTab($event) {
    if ($event.index == 0)
      this._getInfo().pipe(takeUntil(this.unsubscribe$))
    if ($event.index == 1)
      this._getMasterReview();
    if ($event.index == 2) {

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
  public getServices() {
    return this._masterService.getServices(this.id).pipe(map((data: ServerResponse<any[]>) => {
      console.log(data);
      this.services = data.results
    }))
  }
  private _getInfo() {
    return this._masterService.getMasterById(this.id).pipe(map((data: ServerResponse<IUser[]>) => {
      if (data.count) {
        this.master = data.results[0]
      }
    }))
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
