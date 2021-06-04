import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { CityCardComponent, CreateEditCityComponent, CreateEditCountryComponent } from "./component";
import { CountryRoutingModule } from "./country-routing.module";
import { CountryComponent } from "./country.component";
import { CountryService } from "./country.service";

@NgModule({
    declarations: [CountryComponent, CityCardComponent, CreateEditCountryComponent, CreateEditCityComponent],
    imports: [CountryRoutingModule, SharedModule, IconsProviderModule, TranslateModule],
    providers: [CountryService]
})
export class CountryModule { }
