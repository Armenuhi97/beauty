import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewState } from './reviews.state';

export const selectReviewState = createFeatureSelector<ReviewState>('reviews');

export const selectReview = createSelector(
    selectReviewState,
    (state) => {        
        return state.reviews;
    }
);



