import { EmailNotification } from "@models/index";

export class PushNotificationState {
    pushNotifications: EmailNotification[];
}

export const initialState: PushNotificationState = {
    pushNotifications: [],
};
