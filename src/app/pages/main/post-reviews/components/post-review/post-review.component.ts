import { Component } from "@angular/core";
import { DEFAULT_POST_REVIEW } from "@globals/index";
import { PostReview } from "@models/index";
import { Store } from "@ngrx/store";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetPostReview } from "@store/post-review/post-review.action";
import { selectPostReview } from "@store/post-review/post-review.selectors";
import { PostReviewState } from "@store/post-review/post-review.state";
import { Observable } from "rxjs";

@Component({
    selector: 'app-post-review',
    templateUrl: 'post-review.component.html',
    styleUrls: ['post-review.component.scss']
})
export class PostReviewComponent { 
    public potReviews$: Observable<PostReview[]>;

    constructor(
      private _store: Store<{ breadcrumbs: BreadCrumbState, postReviews: PostReviewState }>
    ) {
      _store.dispatch(SetPostReview({ payload: DEFAULT_POST_REVIEW }));
      this.potReviews$ = _store.select(selectPostReview);
    }
  
    ngOnInit(): void {
    }
}