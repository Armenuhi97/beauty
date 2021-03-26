import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UtilsState } from './utils.state';

export const selectUtilsState = createFeatureSelector<UtilsState>('utils');

export const selectUtils = createSelector(
    selectUtilsState,
    (state) => {        
        return state.utils;
    }
);



