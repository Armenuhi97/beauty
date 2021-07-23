import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ServerResponse } from "@models/server-respoce";
import { IUser } from "@models/users";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CreateChatService } from "src/app/core/services/create-chat.service";
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
  users: IUser[] = []
  constructor(private _userService: UsersService,private _router:Router, private _createChatService: CreateChatService) { }

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
    this._userService.getUsers(offset).pipe(takeUntil(this.unsubscribe$)).subscribe((data: ServerResponse<IUser[]>) => {
      this.total = data.count;
      this.users = data.results

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