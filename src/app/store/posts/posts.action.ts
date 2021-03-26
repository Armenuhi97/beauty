import { createAction, props } from '@ngrx/store';
import {  Post } from '@models/index';

enum EPostsActions {
    SetPosts = '[Posts] Set Posts',
    AddPosts = '[Posts] Add Posts',
}

export const SetPosts = createAction(
    EPostsActions.SetPosts,
    props<{ payload: Post[] }>()
);

export const AddPosts = createAction(
    EPostsActions.AddPosts,
    props<{ payload: Post }>()
);