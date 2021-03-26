import { EmailNotification } from "@models/index";

export class EmailNotificationState {
    emailNotifications: EmailNotification[];
}

export const initialState: EmailNotificationState = {
    emailNotifications: [],
};
