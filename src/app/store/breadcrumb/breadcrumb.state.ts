import { IBreadCrumb } from '@models/index';

export class BreadCrumbState {
  breadCrumbs: IBreadCrumb[];
}

export const initialState: BreadCrumbState = {
  breadCrumbs: [],
};
