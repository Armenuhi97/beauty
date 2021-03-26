import { Component } from "@angular/core";
import { DEFAULT_MASTERS } from "@globals/masters";
import { DEFAULT_USERS } from "@globals/user";
import { Store } from "@ngrx/store";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetMasters } from "@store/masters/masters.actions";
import { selectMasters } from "@store/masters/masters.selectors";
import { MastersState } from "@store/masters/masters.state";
import { Observable } from "rxjs";

@Component({
    selector:'app-users',
    templateUrl:'./users.component.html',
    styleUrls:['./users.component.scss']
})
export class UsersComponent{
    public users$: Observable<any[]>;

    constructor(
        private _store: Store<{ breadcrumbs: BreadCrumbState, masters: MastersState }>
      ) {
        _store.dispatch(SetMasters({ payload: DEFAULT_USERS }));
        this.users$ = _store.select(selectMasters);
      }
  
    ngOnInit(): void {
    }
}