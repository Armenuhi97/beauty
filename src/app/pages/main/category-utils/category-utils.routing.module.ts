import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryUtilsComponent } from "./components";
const routes: Routes = [{ path: '', component: CategoryUtilsComponent }]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryUtilsRoutingModule { }