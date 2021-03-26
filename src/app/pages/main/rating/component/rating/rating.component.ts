import { Component } from "@angular/core";
import { DEFAULT_Review } from "@globals/index";
import { Reviews } from "@models/index";
import { Store } from "@ngrx/store";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetReviews } from "@store/reviews/reviews.action";
import { selectReview } from "@store/reviews/reviews.selectors";
import { ReviewState } from "@store/reviews/reviews.state";
import { Observable } from "rxjs";

@Component({
    selector: 'app-rating',
    templateUrl: 'rating.component.html',
    styleUrls: ['rating.component.scss']
})
export class RatingComponent {
    public reviews$: Observable<Reviews[]>;

    constructor(
      private _store: Store<{ breadcrumbs: BreadCrumbState, reviews: ReviewState }>
    ) {
      _store.dispatch(SetReviews({ payload: DEFAULT_Review }));
      this.reviews$ = _store.select(selectReview);
    }
  
    ngOnInit(): void {
    }
 }