import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { TarifComponent } from "./tarif.component";
import { TarifRoutingModule } from "./tarif.routing.module";
import { TarifService } from "./tarif.service";

@NgModule({
    declarations: [TarifComponent],
    imports: [TarifRoutingModule, SharedModule],
    providers:[TarifService]
})
export class TarifModule { }