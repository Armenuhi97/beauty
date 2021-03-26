import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { EmailNotificationsComponent } from "./components";
import { EmailNotificationsRoutingModule } from "./email-notifications-routing.module";

@NgModule({
    declarations: [EmailNotificationsComponent],
    imports: [EmailNotificationsRoutingModule, SharedModule, IconsProviderModule, TranslateModule]

})
export class EmailNtificationsModule { }