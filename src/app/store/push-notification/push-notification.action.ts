import { EmailNotification } from '@models/index';
import { createAction, props } from '@ngrx/store';

enum EPushNotificationActions {
    SetPushNotification = '[PushNotification] Set PushNotification',
    AddPushNotification = '[PushNotification] Add PushNotification',
}

export const SetPushNotification = createAction(
    EPushNotificationActions.SetPushNotification,
    props<{ payload: EmailNotification[] }>()
);

export const AddPushNotification = createAction(
    EPushNotificationActions.AddPushNotification,
    props<{ payload: EmailNotification }>()
);