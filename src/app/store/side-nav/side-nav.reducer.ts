import { createReducer, on } from '@ngrx/store';
import { SetSideNavItems } from './side-nav.actions';
import { SideNavState, initialState } from './side-nav.state';

const sideNavReducer = createReducer(
    initialState,
    on(
        SetSideNavItems,
        (state, { payload }) => {
            return { ...state, sideItems: payload };
        }
    )
);

export function SideNavReducer(state, action): SideNavState {
    return sideNavReducer(state, action);
}
