import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PushNotificationState } from './push-notification.state';

export const selectPushNotificationState = createFeatureSelector<PushNotificationState>('pushNotifications');

export const selectPushNotification = createSelector(
    selectPushNotificationState,
    (state) => {                        
        return state.pushNotifications;
    }
);



