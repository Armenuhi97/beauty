import { Component, Input } from "@angular/core";
import { PostComment } from "@models/post-comment";
import { ServerResponse } from "@models/server-respoce";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { PostService } from "../../post.service";

@Component({
    selector: 'app-post-comment',
    templateUrl: 'post-comment.component.html',
    styleUrls: ['post-comment.component.scss']
})
export class PostCommentComponent {
    private _postId: number
    @Input('postId')
    set setId($event) {
        this._postId = $event;
        if ($event) {
            this.getPostCommentsList()
        } else {
            this.postComments = []
        }
    }
    unsubscribe$ = new Subject();
    public total: number;
    public pageIndex = 1;
    public pageSize = 10;
    postComments: PostComment[] = []
    constructor(private _postService: PostService) { }

    ngOnInit() { }

    public getPostCommentsList() {
        const offset = (this.pageIndex - 1) * this.pageSize;
        this._postService.getPostCommet(this._postId, offset).pipe(takeUntil(this.unsubscribe$)).subscribe((data: ServerResponse<PostComment[]>) => {

            this.postComments = data.results;
            this.total = data.count
        })

    }
    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this.getPostCommentsList()
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}