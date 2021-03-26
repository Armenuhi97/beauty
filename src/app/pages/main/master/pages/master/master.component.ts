import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DEFAULT_MASTERS } from '@globals/index';
import { IUser } from '@models/index';
import { Store } from '@ngrx/store';
import { BreadCrumbState } from '@store/breadcrumb/breadcrumb.state';
import { SetMasters } from '@store/masters/masters.actions';
import { selectMasters } from '@store/masters/masters.selectors';
import { MastersState } from '@store/masters/masters.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MasterComponent implements OnInit {
  public masters$: Observable<IUser[]>;

  constructor(
    private _store: Store<{ breadcrumbs: BreadCrumbState, masters: MastersState }>
  ) {
    _store.dispatch(SetMasters({ payload: DEFAULT_MASTERS }));
    this.masters$ = _store.select(selectMasters);
  }

  ngOnInit(): void {
  }

}
