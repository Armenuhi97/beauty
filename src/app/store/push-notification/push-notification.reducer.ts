import { createReducer, on } from '@ngrx/store';
import { SetPushNotification } from './push-notification.action';
import { PushNotificationState, initialState } from './push-notification.state';

const pushNotificationReducer = createReducer(
    initialState,
    on(
        SetPushNotification,
        (state, { payload }) => {
            return { ...state, pushNotifications: payload };
        }
    )
);

export function PushNotificationReducer(state, action): PushNotificationState {
    return pushNotificationReducer(state, action);
}
