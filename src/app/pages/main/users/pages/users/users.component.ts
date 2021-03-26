import { Component } from "@angular/core";
import { DEFAULT_MASTERS } from "@globals/masters";
import { DEFAULT_USERS } from "@globals/user";
import { ServerResponse } from "@models/server-respoce";
import { IUser } from "@models/users";
import { Store } from "@ngrx/store";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetMasters } from "@store/masters/masters.actions";
import { selectMasters } from "@store/masters/masters.selectors";
import { MastersState } from "@store/masters/masters.state";
import { Observable, Subject } from "rxjs";
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