import { FeedBack } from "@models/index";

export class FeedbackState {
    feedbacks: FeedBack[];
}

export const initialState: FeedbackState = {
    feedbacks: [],
};
