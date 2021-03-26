import { Reviews } from "@models/index";

export class ReviewState {
    reviews: Reviews[];
}

export const initialState: ReviewState = {
    reviews: [],
};
