import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { TarifComponent } from "./tarif.component";
import { TarifRoutingModule } from "./tarif.routing.module";
import { TarifService } from "./tarif.service";

@NgModule({
    declarations: [TarifComponent],
    imports: [TarifRoutingModule, SharedModule, IconsProviderModule, TranslateModule],
    providers: [TarifService]
})
export class TarifModule { }