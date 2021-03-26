import { Component } from "@angular/core";
import { ServerResponse } from "@models/server-respoce";
import { IUser } from "@models/users";
import {  Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UsersService } from "../../users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  users:IUser[] = []
  constructor(private _userService: UsersService) { }

  ngOnInit(): void {
    this.getUsersList()
  }
  public getUsersList() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    this._userService.getUsers(offset).pipe(takeUntil(this.unsubscribe$)).subscribe((data: ServerResponse<IUser[]>) => {
      this.total = data.count;
      this.users=data.results
      console.log(data);

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