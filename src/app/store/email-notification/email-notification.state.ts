import { NotificationModel } from "@models/index";

export class EmailNotificationState {
    emailNotifications: NotificationModel[];
}

export const initialState: EmailNotificationState = {
    emailNotifications: [],
};
