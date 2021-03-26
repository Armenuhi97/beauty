import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { FeedbackComponent } from "./component";
import { FeedbackRoutingModule } from "./feedback-routing.module";

@NgModule({
    declarations: [FeedbackComponent],
    imports: [SharedModule, IconsProviderModule, TranslateModule, FeedbackRoutingModule]
})
export class FeedbackModule { }