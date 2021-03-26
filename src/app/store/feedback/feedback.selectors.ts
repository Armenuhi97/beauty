import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedbackState } from './feedback.state';

export const selectFeedbackState = createFeatureSelector<FeedbackState>('feedbacks');

export const selectFeedback = createSelector(
    selectFeedbackState,
    (state) => {                
        return state.feedbacks;
    }
);



