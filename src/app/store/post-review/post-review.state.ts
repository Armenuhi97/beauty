import {  PostReview } from "@models/index";

export class PostReviewState {
    postReviews: PostReview[];
}

export const initialState: PostReviewState = {
    postReviews: [],
};
