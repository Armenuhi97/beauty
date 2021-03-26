import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './posts.state';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPost = createSelector(
    selectPostState,
    (state) => {        
        return state.posts;
    }
);



