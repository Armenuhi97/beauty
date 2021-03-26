import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreadCrumbState } from './breadcrumb.state';

export const selectBreadCrumbsState = createFeatureSelector<BreadCrumbState>('breadCrumbs');

export const selectBreadCrumbs = createSelector(
  selectBreadCrumbsState,
  (state) => state.breadCrumbs
);
