import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './page/main.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TopBarComponent, BreadCrumbComponent, LeftBarComponent } from './components';
import { IconsProviderModule } from 'src/app/icons-provider.module';

@NgModule({
  declarations: [MainComponent, BreadCrumbComponent, TopBarComponent, LeftBarComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, TranslateModule, IconsProviderModule],
})
export class MainModule { }
