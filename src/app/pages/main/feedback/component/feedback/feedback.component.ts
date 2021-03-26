import { Component } from "@angular/core";
import { DEFAULT_Feedback } from "@globals/index";
import { FeedBack } from "@models/index";
import { Store } from "@ngrx/store";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetFeedback } from "@store/feedback/feedback.action";
import { selectFeedback } from "@store/feedback/feedback.selectors";
import { FeedbackState } from "@store/feedback/feedback.state";
import { Observable } from "rxjs";

@Component({
    selector: 'app-feedback',
    templateUrl: 'feedback.component.html',
    styleUrls: ['feedback.component.scss']
})
export class FeedbackComponent { 
    public feedbacks$: Observable<FeedBack[]>;

    constructor(
      private _store: Store<{ breadcrumbs: BreadCrumbState, feedbacks: FeedbackState }>
    ) {
      _store.dispatch(SetFeedback({ payload: DEFAULT_Feedback }));
      this.feedbacks$ = _store.select(selectFeedback);
    }
  
    ngOnInit(): void {
    }
}