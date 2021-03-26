import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MastersState } from './masters.state';

export const selectMastersState = createFeatureSelector<MastersState>('masters');

export const selectMasters = createSelector(
    selectMastersState,
    (state) => {        
        return state.masters;
    }
);



