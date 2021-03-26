import { createReducer, on } from '@ngrx/store';
import { SetBreadCrumbs } from './breadCrumb.actions';
import { BreadCrumbState, initialState } from './breadcrumb.state';

const breadCrumbReducer = createReducer(
  initialState,
  on(
    SetBreadCrumbs,
    (state: BreadCrumbState, { payload }) => {
      return { ...state, breadCrumbs: payload };
    }
  )
);

export function BreadCrumbReducer(state, action): BreadCrumbState {
  return breadCrumbReducer(state, action);
}
