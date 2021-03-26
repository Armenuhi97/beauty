import { createAction, props } from '@ngrx/store';
import { IUser, Reviews } from '@models/index';

enum EReviewsActions {
    SetReviews = '[Reviews] Set Reviews',
    AddReviews = '[Reviews] Add Reviews',
}

export const SetReviews = createAction(
    EReviewsActions.SetReviews,
    props<{ payload: Reviews[] }>()
);

export const AddReviews = createAction(
    EReviewsActions.AddReviews,
    props<{ payload: Reviews }>()
);