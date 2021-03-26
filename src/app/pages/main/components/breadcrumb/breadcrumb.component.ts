import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IBreadCrumb } from '@models/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBreadCrumbs } from '@store/breadcrumb/breadcrumb.selectors';
import { BreadCrumbState } from '@store/breadcrumb/breadCrumb.state';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbComponent implements OnInit {
  public breadCrumbs$: Observable<IBreadCrumb[]>;
  constructor(
    private _store: Store<{ breadCrumbs: BreadCrumbState }>
  ) {
    this.breadCrumbs$ = _store.select(selectBreadCrumbs);
  }

  ngOnInit(): void {
  }

}
