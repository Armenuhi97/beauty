import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RatingComponent } from "./component";
const routes: Routes = [{ path: '', component: RatingComponent }]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RatingRoutingModule { }