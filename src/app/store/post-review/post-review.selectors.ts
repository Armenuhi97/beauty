import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostReviewState } from './post-review.state';

export const selectPostReviewStateState = createFeatureSelector<PostReviewState>('postReviews');

export const selectPostReview = createSelector(
    selectPostReviewStateState,
    (state) => {                
        return state.postReviews;
    }
);



