import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, ServerResponse } from '@models/index';
import {  Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateChatService } from 'src/app/core/services/create-chat.service';
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
  constructor(private _mesterService: MasterService,private _router:Router, private _createChatService: CreateChatService) { }

  ngOnInit(): void {
    this.getUsersList()
  }
  public chatWithUser(id: number): void {
    this._createChatService.createChat(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((room: any) => {
        this._router.navigate([`dashboard/chat/`], { queryParams: { focusedUserId: room.id } });
      });
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
