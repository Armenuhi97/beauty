import { createReducer, on } from '@ngrx/store';
import {  SetPostReview } from './post-review.action';
import { PostReviewState, initialState } from './post-review.state';

const postReviewReducer = createReducer(
    initialState,
    on(
        SetPostReview,
        (state, { payload }) => {
            return { ...state, postReviews: payload };
        }
    )
);

export function PostReviewReducer(state, action): PostReviewState {
    return postReviewReducer(state, action);
}
