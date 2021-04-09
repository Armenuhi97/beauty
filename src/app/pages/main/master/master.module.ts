import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './pages/master/master.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { MasterService } from './master.service';
import { MasterDetailsComponent } from './pages/master-details/master-details.component';
import { MasterTarifComponent } from './pages/master-details/components';

@NgModule({
  declarations: [MasterComponent,MasterDetailsComponent,MasterTarifComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    TranslateModule,
    IconsProviderModule
  ],
  providers: [MasterService]
})
export class MasterModule { }
