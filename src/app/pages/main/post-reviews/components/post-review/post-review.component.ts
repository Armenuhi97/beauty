import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DEFAULT_POST_REVIEW } from "@globals/index";
import { Post, PostReview, ServerResponse } from "@models/index";
import { PostComment } from "@models/post-comment";
import { Store } from "@ngrx/store";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetPostReview } from "@store/post-review/post-review.action";
import { selectPostReview } from "@store/post-review/post-review.selectors";
import { PostReviewState } from "@store/post-review/post-review.state";
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { StatusService } from "src/app/core/services/status.service";
import { PostReviewService } from "../../post-review.service";

@Component({
  selector: 'app-post-review',
  templateUrl: 'post-review.component.html',
  styleUrls: ['post-review.component.scss'],
  providers: [DatePipe]
})
export class PostReviewComponent {
  public potReviews: PostComment[];
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  selectedValue: string = 'all';
  statusList = [];
  isVisible: boolean = false;
  activeComment: PostComment;
  activePost: Post;
  isVisiblePostModal: boolean = false
  constructor(private _postReviewService: PostReviewService,
    private _router: Router,
    private _statusService: StatusService
  ) {
    this.statusList = this._statusService.getStatusList()
  }

  ngOnInit(): void {
    this.getCommentsList().pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  filter($event) {
    this.pageIndex = 1;
    this.getCommentsList().pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  openPostModal(post: number) {
    // this.imageObject = []
    this._router.navigate([`/dashboard/posts`], { queryParams: { id: post } })
    // this.isVisiblePostModal = true;
    // this._postReviewService.getPostById(post).pipe(takeUntil(this.unsubscribe$)).subscribe((data:Post) => {      
    //   if (data)
    //     this.activePost = data;
    // })

  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getCommentsList().pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  showModal(index: number) {
    this.isVisible = true;
    this.activeComment = this.potReviews[index];

  }
  closePost($event) {
    this.isVisiblePostModal = false;
    this.activePost = null;
  }
  acceptComment() {
    this._postReviewService.acceptComment(this.activeComment.id).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.closeModal()
        return this.getCommentsList()
      })
    ).subscribe()
  }
  cancelComment() {
    this._postReviewService.cancelComment(this.activeComment.id).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.closeModal()
        return this.getCommentsList()
      })
    ).subscribe()
  }

  closeModal() {
    this.isVisible = false;
    this.activeComment = null
  }
  getCommentsList() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    return this._postReviewService.getComments(offset, this.selectedValue).pipe(
      map((data: ServerResponse<PostComment[]>) => {
        this.potReviews = data.results;
        this.total = data.count
      }))
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}