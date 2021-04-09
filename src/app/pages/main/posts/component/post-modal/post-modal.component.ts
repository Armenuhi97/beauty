import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Post } from "@models/post";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { PostResponseService } from "src/app/core/services/post-response.service";

@Component({
    selector: 'app-post-modal',
    templateUrl: 'post-modal.component.html',
    styleUrls: ['post-modal.component.scss']
})
export class PostModalComponent {
    unsubscribe$ = new Subject();
    @Output() close = new EventEmitter()
    activePost: Post;
    imageObject = [];
    @Input('activePost')
    set setActivePost($event) {
        this.activePost = $event;
        if (this.activePost) {
            this.imageObject = []
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
    }
    
    constructor(private _postService: PostResponseService) { }

    closeModal(type?) {
        this.imageObject=[]
        this.close.emit(type)
    }

    cancelPost() {
        this._postService.cancelPost(this.activePost.id).pipe(
            takeUntil(this.unsubscribe$),
            map(() => {
                this.closeModal('cancel')
            })
        ).subscribe()
    }

    acceptPost() {
        this._postService.acceptPost(this.activePost.id).pipe(
            takeUntil(this.unsubscribe$),
            map(() => {
                this.closeModal('accept')
            })
        ).subscribe()
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}