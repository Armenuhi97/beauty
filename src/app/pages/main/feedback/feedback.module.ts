import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { FeedbackComponent } from "./component";
import { FeedbackRoutingModule } from "./feedback-routing.module";
import { FeedbackService } from "./feedback.service";

@NgModule({
    declarations: [FeedbackComponent],
    imports: [SharedModule, IconsProviderModule, TranslateModule, FeedbackRoutingModule],
    providers: [FeedbackService]
})
export class FeedbackModule { }