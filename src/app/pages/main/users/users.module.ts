import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersService } from "./users.service";

@NgModule({
    declarations: [UsersRoutingModule.components],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        TranslateModule,
        IconsProviderModule
    ],
    providers: [UsersService]
})
export class UsersModule { }