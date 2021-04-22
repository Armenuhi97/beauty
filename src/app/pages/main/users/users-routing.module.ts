import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserDetailComponent, UsersComponent } from "./pages";
import { UserHistoryComponent, UserInfoComponent } from "./pages/user-detail/component";

const routes = [
    { path: '', component: UsersComponent },
    { path: ':id', component: UserDetailComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
    static components = [UserDetailComponent, UsersComponent, UserInfoComponent, UserHistoryComponent];
}