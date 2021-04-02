import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BougthTarifComponent } from "./bought-tarif.component";
const routes: Routes = [{ path: '', component: BougthTarifComponent }]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoughtTarifRoutingModule { }