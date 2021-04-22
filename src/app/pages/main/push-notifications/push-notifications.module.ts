import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { PushNotificationComponent } from "./component";
import { PushNotificationService } from "./push-notification.service";
import { PushNotificationsRoutingModule } from "./push-notifications-routing.module";

@NgModule({
    declarations: [PushNotificationComponent],
    imports: [PushNotificationsRoutingModule, SharedModule, IconsProviderModule, TranslateModule],
    providers:[PushNotificationService]
})
export class PushNotificationModule { }