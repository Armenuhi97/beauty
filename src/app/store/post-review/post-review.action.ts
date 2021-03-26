import {  PostReview } from '@models/index';
import { createAction, props } from '@ngrx/store';

enum EPostReviewActions {
    SetPostReview = '[PostReview] Set PostReview',
    AddPostReview = '[PostReview] Add PostReview',
}

export const SetPostReview = createAction(
    EPostReviewActions.SetPostReview,
    props<{ payload: PostReview[] }>()
);

export const AddFeedback = createAction(
    EPostReviewActions.AddPostReview,
    props<{ payload: PostReview }>()
);