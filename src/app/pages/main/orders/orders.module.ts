import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders.routing.module";
import { OrdersService } from "./orders.service";

@NgModule({
    declarations: [OrdersComponent],
    imports: [OrdersRoutingModule, SharedModule, IconsProviderModule, TranslateModule],
    providers: [OrdersService]
})
export class OrderModule { }