import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { RatingComponent } from "./component";
import { RatingRoutingModule } from "./rating-routing.module";

@NgModule({
    declarations: [RatingComponent],
    imports: [
        SharedModule,
        TranslateModule,
        IconsProviderModule,
        RatingRoutingModule]
})
export class RatingModule { }