import { createReducer, on } from '@ngrx/store';
import { SetPosts } from './posts.action';
import { initialState, PostState } from './posts.state';

const postReducer = createReducer(
    initialState,
    on(
        SetPosts,
        (state, { payload }) => {
            return { ...state, posts: payload };
        }
    )
);

export function PostReducer(state, action): PostState {
    return postReducer(state, action);
}
