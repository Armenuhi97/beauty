import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { BougthTarifComponent } from "./bought-tarif.component";
import { BoughtTarifRoutingModule } from "./bought-tarif.routing.module";
import { BoughtTarifService } from "./bought-tarif.service";

@NgModule({
    declarations: [BougthTarifComponent],
    imports: [BoughtTarifRoutingModule, SharedModule, IconsProviderModule, TranslateModule],
    providers: [BoughtTarifService]
})
export class BougthTarifModule { }