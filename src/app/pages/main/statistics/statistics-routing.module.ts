import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticItemComponent } from "./pages/statistic-item/statistic-item.component";
import { StatisticsService } from "./statistics.service";
const routes: Routes = [{ path: '', component: StatisticItemComponent }]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[StatisticsService]
})
export class StatisticRoutingModule { }