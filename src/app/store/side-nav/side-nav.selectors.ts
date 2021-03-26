import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SideNavState } from './side-nav.state';

export const selectSideNavState = createFeatureSelector<SideNavState>('sideNav');

export const selectSideNavItems = createSelector(
    selectSideNavState,
    (state) => {
        return state.sideItems;
    }
);



