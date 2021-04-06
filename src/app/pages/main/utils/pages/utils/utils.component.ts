import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category, Service } from '@models/category';
import { ServerResponse } from '@models/server-respoce';
import { Utils } from '@models/utils';
import { Store } from '@ngrx/store';
import { BreadCrumbState } from '@store/breadcrumb/breadcrumb.state';
import { SetUtils } from '@store/utils/utils.actions';
import { selectUtils } from '@store/utils/utils.selectors';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
  providers: [DatePipe]
})
export class UtilsComponent implements OnInit {
  public utils: Utils[] = [];
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  categoryControl = new FormControl('');
  serviceControl = new FormControl('');
  categories: Category[] = [];
  services: Service[];

  constructor(private _utilsService: UtilsService) { }

  ngOnInit() {
    this.combineObservable()
    // this.getUtils()
  }
  combineObservable() {
    const combine = forkJoin(
      this.getCategories()
    )
    combine.pipe(takeUntil(this.unsubscribe$)).subscribe()
  }

  public getCategories() {
    return this._utilsService.getCategoriesList().pipe(
      map((data: ServerResponse<Category[]>) => {
        this.categories = data.results
        console.log(data);
        
      })
    )
  }
  subscribeToCategoryChange(): void {
    this.categoryControl.valueChanges.pipe(takeUntil(this.unsubscribe$),
      switchMap((data: Category) => {
        this.serviceControl.setValue('');
        if (data) {
          this.services = data.services;
          return this.getUtils()
        } else {
          this.services = [];
          return this.getUtils()
        }
      })).subscribe();
  }
  subscribeToServiceChange(): void {
    this.serviceControl.valueChanges.pipe(takeUntil(this.unsubscribe$),
      switchMap(() => {
        return this.getUtils()
      })).subscribe();
  }
  public getUtils() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    return this._utilsService.getUtils(offset).pipe(
      map((data) => {
        this.total = data.count;
        this.utils = data.results
      }))
  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getUtils()
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
