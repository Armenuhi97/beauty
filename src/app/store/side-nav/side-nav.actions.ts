import { createAction, props } from '@ngrx/store';
import { ISideNavItem } from '@models/index';

enum ESideNavActions {
    SetSideNavItems = '[SideNav] Set SideNav items',
    AddSideNavItem = '[SideNav] Add SideNav item'
}

export const SetSideNavItems = createAction(
    ESideNavActions.SetSideNavItems,
    props<{ payload: ISideNavItem[] }>()
);

export const AddSideNavItem = createAction(
    ESideNavActions.AddSideNavItem,
    props<{ payload: ISideNavItem }>()
);
