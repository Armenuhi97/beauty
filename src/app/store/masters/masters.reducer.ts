import { createReducer, on } from '@ngrx/store';
import { SetMasters } from './masters.actions';
import { MastersState, initialState } from './masters.state';

const mastersReducer = createReducer(
    initialState,
    on(
        SetMasters,
        (state, { payload }) => {
            return { ...state, masters: payload };
        }
    )
);

export function MastersReducer(state, action): MastersState {
    return mastersReducer(state, action);
}
