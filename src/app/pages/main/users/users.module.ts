import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { UsersComponent } from "./pages";
import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
    declarations: [UsersComponent],
    imports: [CommonModule,
        UsersRoutingModule,
        SharedModule,
        TranslateModule,
        IconsProviderModule]
})
export class UsersModule { }