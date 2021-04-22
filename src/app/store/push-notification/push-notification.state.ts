import { NotificationModel } from "@models/index";

export class PushNotificationState {
    pushNotifications: NotificationModel[];
}

export const initialState: PushNotificationState = {
    pushNotifications: [],
};
