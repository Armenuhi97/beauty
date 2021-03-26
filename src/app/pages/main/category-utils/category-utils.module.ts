import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { CategoryUtilsRoutingModule } from "./category-utils.routing.module";
import { CategoryUtilsService } from "./category-utils.service";
import { CategoryUtilsComponent } from "./components";
import { CategoryCardComponent, SubcategoryCardComponent } from "./components/components";

@NgModule({
    declarations: [CategoryUtilsComponent,CategoryCardComponent,SubcategoryCardComponent],
    imports: [SharedModule, IconsProviderModule, TranslateModule, CategoryUtilsRoutingModule],
    providers:[CategoryUtilsService]
})
export class CategoryUtilsModule { }