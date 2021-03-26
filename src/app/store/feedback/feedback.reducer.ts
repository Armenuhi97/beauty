import { createReducer, on } from '@ngrx/store';
import { SetFeedback } from './feedback.action';
import { FeedbackState, initialState } from './feedback.state';

const feedbackReducer = createReducer(
    initialState,
    on(
        SetFeedback,
        (state, { payload }) => {
            return { ...state, feedbacks: payload };
        }
    )
);

export function FeedbackReducer(state, action): FeedbackState {
    return feedbackReducer(state, action);
}
