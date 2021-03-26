import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ISideNavItem } from '@models/index';
import { Store } from '@ngrx/store';
import { selectSideNavItems } from '@store/side-nav/side-nav.selectors';
import { SideNavState } from '@store/side-nav/side-nav.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftBarComponent implements OnInit {
  @Input() isCollapsed: boolean;
  public sideNavItems$: Observable<ISideNavItem[]>;
  constructor(
    private _store: Store<{ sideNav: SideNavState }>
  ) {
    this.sideNavItems$ = _store.select(selectSideNavItems);
  }

  ngOnInit(): void {
  }

}
