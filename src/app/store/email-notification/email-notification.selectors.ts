import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmailNotificationState } from './email-notification.state';

export const selectEmailNotificationState = createFeatureSelector<EmailNotificationState>('emailNotifications');

export const selectEmailNotification = createSelector(
    selectEmailNotificationState,
    (state) => {                        
        return state.emailNotifications;
    }
);



