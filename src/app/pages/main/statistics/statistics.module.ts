import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { StatisticItemComponent } from "./pages/statistic-item/statistic-item.component";
import { StatisticRoutingModule } from "./statistics-routing.module";
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from "./pages/statistic-item/component";

@NgModule({
    declarations: [StatisticItemComponent,ChartComponent],
    imports: [CommonModule,
        ChartsModule,
        StatisticRoutingModule,
        SharedModule,
        TranslateModule,
        IconsProviderModule]
})
export class StatisticModule { }