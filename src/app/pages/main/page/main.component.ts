import { Component, OnInit } from '@angular/core';
import { DEFAULT_NAVIGATION_ITEMS } from '@globals/index';
import { Store } from '@ngrx/store';
import { SetSideNavItems } from '@store/side-nav/side-nav.actions';
import { SideNavState } from '@store/side-nav/side-nav.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public isCollapsed: boolean = false;

  constructor(
    private _store: Store<{ sideNav: SideNavState }>
  ) {
    _store.dispatch(SetSideNavItems({ payload: DEFAULT_NAVIGATION_ITEMS }));
  }

  ngOnInit(): void {
  }

  public toggleCollapsed(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }

}
