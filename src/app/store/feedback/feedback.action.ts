import { FeedBack } from '@models/index';
import { createAction, props } from '@ngrx/store';

enum EFeedbackActions {
    SetFeedback = '[Feedback] Set Feedback',
    AddFeedback = '[Feedback] Add Feedback',
}

export const SetFeedback = createAction(
    EFeedbackActions.SetFeedback,
    props<{ payload: FeedBack[] }>()
);

export const AddFeedback = createAction(
    EFeedbackActions.AddFeedback,
    props<{ payload: FeedBack }>()
);