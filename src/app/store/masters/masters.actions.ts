import { createAction, props } from '@ngrx/store';
import { IUser } from '@models/index';

enum EMastersActions {
    SetMasters = '[Masters] Set Masters',
    AddMaster = '[Masters] Add Master',
}

export const SetMasters = createAction(
    EMastersActions.SetMasters,
    props<{ payload: IUser[] }>()
);

export const AddMaster = createAction(
    EMastersActions.AddMaster,
    props<{ payload: IUser }>()
);
