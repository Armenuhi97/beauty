import { createReducer, on } from '@ngrx/store';
import { SetReviews } from './reviews.action';
import { initialState, ReviewState } from './reviews.state';

const reviewReducer = createReducer(
    initialState,
    on(
        SetReviews,
        (state, { payload }) => {
            return { ...state, reviews: payload };
        }
    )
);

export function ReviewReducer(state, action): ReviewState {
    return reviewReducer(state, action);
}
