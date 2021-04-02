import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Reviews } from "@models/review";
import { ServerResponse } from "@models/server-respoce";
import { IUser } from "@models/users";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UsersService } from "../../users.service";

@Component({
    selector: 'app-user-detail',
    templateUrl: 'user-detail.component.html',
    styleUrls: ['user-detail.component.scss']
})
export class UserDetailComponent {
    unsubscribe$ = new Subject();
    id: number;
    user: IUser;
    reviews = [];
    public pageIndex = 1;
    public pageSize = 10;
    total: number;
    constructor(private route: ActivatedRoute,
        private _userService: UsersService) {
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
            this._getClientReview()
    }
    private _getClientReview() {
        const offset = (this.pageIndex - 1) * this.pageSize;
        this._userService.getClientReview(this.id, offset).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe((data: ServerResponse<Reviews[]>) => {
            this.reviews = data.results;
            this.total = data.count
        })
    }
    private _getInfo() {
        this._userService.getUserById(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe((data: ServerResponse<IUser[]>) => {
            if (data.count) {
                this.user = data.results[0]
            }
        })
    }
    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this._getClientReview()
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}