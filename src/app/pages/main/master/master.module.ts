import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './pages/master/master.component';
import { SharedModule } from '@shared/shared.module';

import { TranslateModule } from '@ngx-translate/core';
import { IconsProviderModule } from 'src/app/icons-provider.module';


@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    TranslateModule,
    IconsProviderModule
  ]
})
export class MasterModule { }
