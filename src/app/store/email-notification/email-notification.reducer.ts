import { createReducer, on } from '@ngrx/store';
import { SetEmailNotification } from './email-notification.action';
import { EmailNotificationState, initialState } from './email-notification.state';

const emailNotificationReducer = createReducer(
    initialState,
    on(
        SetEmailNotification,
        (state, { payload }) => {
            return { ...state, emailNotifications: payload };
        }
    )
);

export function EmailNotificationReducer(state, action): EmailNotificationState {
    return emailNotificationReducer(state, action);
}
