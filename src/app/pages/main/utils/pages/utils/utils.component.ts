import { Component, OnInit } from '@angular/core';
import { DEFAULT_UTILS } from '@globals/utils';
import { Utils } from '@models/utils';
import { Store } from '@ngrx/store';
import { BreadCrumbState } from '@store/breadcrumb/breadcrumb.state';
import { SetUtils } from '@store/utils/utils.actions';
import { selectUtils } from '@store/utils/utils.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {
  public utils$: Observable<any[]>;

  constructor(
    private _store: Store<{ breadcrumbs: BreadCrumbState, utils: Utils }>
  ) {
    _store.dispatch(SetUtils({ payload: DEFAULT_UTILS }));    
    this.utils$ = _store.select(selectUtils);
  }

  ngOnInit(): void {
  }

}
