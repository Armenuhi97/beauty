import { Post } from "@models/index";

export class PostState {
    posts: Post[];
}

export const initialState: PostState = {
    posts: [],
};
