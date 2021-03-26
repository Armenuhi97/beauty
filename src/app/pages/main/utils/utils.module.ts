import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsRoutingModule } from './utils-routing.module';
import { UtilsItemWrapperComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';


@NgModule({
  declarations: [
    UtilsRoutingModule.components,
    UtilsItemWrapperComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    UtilsRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class UtilsModule { }
