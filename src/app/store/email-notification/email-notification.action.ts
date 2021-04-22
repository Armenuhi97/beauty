import { NotificationModel } from '@models/index';
import { createAction, props } from '@ngrx/store';

enum EEmailNotificationActions {
    SetEmailNotification = '[EmailNotification] Set EmailNotification',
    AddEmailNotification = '[EmailNotification] Add EmailNotification',
}

export const SetEmailNotification = createAction(
    EEmailNotificationActions.SetEmailNotification,
    props<{ payload: NotificationModel[] }>()
);

export const AddEmailNotification = createAction(
    EEmailNotificationActions.AddEmailNotification,
    props<{ payload: NotificationModel }>()
);