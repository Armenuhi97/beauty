import { IBreadCrumb } from '@models/index';
import { createAction, props } from '@ngrx/store';

enum EBreadCrumbActions {
  SetBreadCrumbs = '[BreadCrumb] Set BreadCrumbs',
  AddBreadCrumb = '[BreadCrumb] Add BreadCrumb',
}

export const SetBreadCrumbs = createAction(
  EBreadCrumbActions.SetBreadCrumbs,
  props<{ payload: IBreadCrumb[] }>()
);

export const AddBreadCrumb = createAction(
    EBreadCrumbActions.AddBreadCrumb,
    props<{ payload: IBreadCrumb[] }>()
);
