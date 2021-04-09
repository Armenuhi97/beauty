import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { EmailNotificationsComponent } from "./components";
import { EmailNotificationsRoutingModule } from "./email-notifications-routing.module";
import { CKEditorModule } from 'ng2-ckeditor';
import { QuillModule } from 'ngx-quill'

@NgModule({
    declarations: [EmailNotificationsComponent],
    imports: [EmailNotificationsRoutingModule,QuillModule.forRoot(),CKEditorModule, SharedModule, IconsProviderModule, TranslateModule]

})
export class EmailNtificationsModule { }