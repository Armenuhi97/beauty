import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Post, ServerResponse } from "@models/index";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { PostService } from "../../post.service";

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrls: ['posts.component.scss'],
  providers: [DatePipe]
})
export class PostsComponent {
  selectedValue: string = 'all';
  statusList = [
    { key: 'all', text: 'STATUS.ALL' },
    { key: 'pending', text: 'STATUS.PENDING' },
    { key: 'canceled', text: 'STATUS.CANCELED' },
    { key: 'accepted', text: 'STATUS.ACCEPTED' },
  ]
  posts: Post[] = []
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  isVisible: boolean = false;
  activePost: Post;
  imageObject = [
    //   {
    //   video: 'https://youtu.be/tYa6OLQHrEc',
    //   title: 'Youtube example one with title.',
    //   alt: 'youtube video'
    // }, {
    //   video: 'https://youtu.be/6pxRHBw-k8M',
    //   alt: 'youtube video'
    // }, {
    //   video: 'https://sanjayv.github.io/ng-image-slider/contents/assets/video/movie2.mp4',
    //   posterImage: "https://slotuniverses.co.uk/wp-content/uploads/sites/12030/upload_fed1091b34dcf8203c0729c4faa62315.png",
    //   title: 'Youtube example one with title.'
    // },
    // {
    //   image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   alt: 'Image alt'
    // }
  ]
  constructor(
    public _postService: PostService,
    private _translateService: TranslateService,
  ) {
  }
  ngOnInit(): void {
    this.getPostList().pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  filter($event) {
    this.pageIndex = 1;
    this.getPostList($event).pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  getPostList(status?: string) {
    const offset = (this.pageIndex - 1) * this.pageSize;
    return this._postService.getPostList(offset, this.selectedValue).pipe(map((data: ServerResponse<Post[]>) => {
      this.total = data.count;
      this.posts = data.results
    }))
  }

  showModal(index: number) {
    this.imageObject = []
    this.isVisible = true;
    this.activePost = this.posts[index];
    for (let file of this.activePost.files) {
      if (file.file_type == 'video') {
        this.imageObject.push({
          video: file.file_url,
        })
      } else {
        if (file.file_type == 'image')
          this.imageObject.push({
            image: file.file_url,
            thumbImage: file.file_url
          })
      }
    }
  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getPostList().pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  acceptPost() {
    this._postService.acceptPost(this.activePost.id).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.closeModal()
        return this.getPostList()
      })
    ).subscribe()
  }
  cancelPost() {
    this._postService.cancelPost(this.activePost.id).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.closeModal()
        return this.getPostList()
      })
    ).subscribe()
  }

  closeModal() {
    this.isVisible = false;
    this.imageObject=[]
    this.activePost = null
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}