import { createAction, props } from '@ngrx/store';
import { Utils } from '@models/utils';

enum EUtilsActions {
    SetUtils = '[Utils] Set Utils',
    AddUtils = '[Utils] Add Utils',
}

export const SetUtils = createAction(
    EUtilsActions.SetUtils,
    props<{ payload: Utils[] }>()
);

export const AddUtils = createAction(
    EUtilsActions.AddUtils,
    props<{ payload: Utils }>()
);
