import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadCrumb';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [],
  imports: [CommonModule,QuillModule.forRoot(), ReactiveFormsModule, FormsModule],
  exports: [
    QuillModule,
    NzTabsModule,
    NzDescriptionsModule,
    NzCarouselModule,
    NzDatePickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzTableModule,
    NzModalModule,
    NzUploadModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzRadioModule,
    NzEmptyModule,
    NzBreadCrumbModule,
    NzImageModule,
    NzGridModule,
    NzCardModule,
    NzSwitchModule
  ],
})
export class SharedModule { }
