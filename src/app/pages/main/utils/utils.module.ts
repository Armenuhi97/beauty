import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsRoutingModule } from './utils-routing.module';
import { UtilsItemWrapperComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { UtilsService } from './utils.service';
import { MyTimePipe } from 'src/app/core/pipes/times.pipe';


@NgModule({
  declarations: [
    UtilsRoutingModule.components,
    UtilsItemWrapperComponent,
    CategoriesComponent,
    MyTimePipe
  ],
  imports: [
    CommonModule,
    UtilsRoutingModule,
    TranslateModule,
    SharedModule
  ],
  providers: [UtilsService]
})
export class UtilsModule { }
