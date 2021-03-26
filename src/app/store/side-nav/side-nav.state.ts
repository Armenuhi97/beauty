import { ISideNavItem } from '@models/index';

export class SideNavState {
    sideItems: ISideNavItem[];
}

export const initialState: SideNavState = {
    sideItems: [],
};
