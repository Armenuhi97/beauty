import { createReducer, on } from '@ngrx/store';
import { SetUtils } from './utils.actions';
import { initialState, UtilsState } from './utils.state';

const utilsReducer = createReducer(
    initialState,
    on(
        SetUtils,
        (state, { payload }) => {
            return { ...state, utils: payload };
        }
    )
);

export function UtilsReducer(state, action):UtilsState {
    return utilsReducer(state, action);
}
