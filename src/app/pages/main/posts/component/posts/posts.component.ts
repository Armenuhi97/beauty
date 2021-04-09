import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post, ServerResponse } from "@models/index";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { StatusService } from "src/app/core/services/status.service";
import { PostService } from "../../post.service";

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.scss'],
  providers: [DatePipe]
})
export class PostsComponent {
  selectedValue: string = 'all';
  statusList = [  ]
  posts: Post[] = []
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  isVisible: boolean = false;
  activePost: Post;
  constructor(
    private _statusService: StatusService,
    public _postService: PostService,
    private _translateService: TranslateService,
    private _route: ActivatedRoute
  ) {
    this.statusList = this._statusService.getStatusList()
  }
  ngOnInit(): void {
    this.getPostList().pipe(takeUntil(this.unsubscribe$)).subscribe();
    this.checkQueryParams()
  }
  filter($event) {
    this.pageIndex = 1;
    this.getPostList($event).pipe(takeUntil(this.unsubscribe$)).subscribe();
   
  }
  getPostList(status?: string) {
    const offset = (this.pageIndex - 1) * this.pageSize;
    return this._postService.getPostList(offset, this.selectedValue).pipe(map((data: ServerResponse<Post[]>) => {
      this.total = data.count;
      this.posts = data.results
    }))
  }

  showModal(index: number) {
    this.isVisible = true;
    this.activePost = this.posts[index];
  
  }
  public checkQueryParams() {
    let params = this._route.snapshot.queryParams;    
    if (params && params.id) {
      this._postService.getPostById(params.id).pipe(takeUntil(this.unsubscribe$)).subscribe((data: Post) => {
        if (data) {
          this.isVisible = true;
          this.activePost = data;          
        }
      })
    }
  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getPostList().pipe(takeUntil(this.unsubscribe$)).subscribe();
  }
  closePost(evt) {
    this.activePost = null;
    if (!evt) {
      this.closeModal();
      return
    }
    if (evt == 'cancel' || evt == 'accept') {
      this.closeModal()
      this.getPostList().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }


  }
  acceptPost() {
    // this._postService.acceptPost(this.activePost.id).pipe(
    //   takeUntil(this.unsubscribe$),
    //   switchMap(() => {
    this.closeModal()
    this.getPostList().pipe(takeUntil(this.unsubscribe$)).subscribe()
    //   })
    // ).subscribe()
  }
  cancelPost() {
    // this._postService.cancelPost(this.activePost.id).pipe(
    //   takeUntil(this.unsubscribe$),
    //   switchMap(() => {
    this.closeModal()
    this.getPostList().pipe(takeUntil(this.unsubscribe$)).subscribe()
    //   })
    // ).subscribe()
  }

  closeModal() {
    this.isVisible = false;
    this.activePost = null
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}