import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  UserOutline,
  LockOutline,
  GlobalOutline,
  TeamOutline,
  CheckSquareOutline,
  LogoutOutline,
  SettingOutline,
  EditOutline,
  PlusCircleFill,
  PlusCircleOutline,
  MessageOutline,
  SendOutline,
  WechatOutline,
  UploadOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  UserOutline,
  LockOutline,
  GlobalOutline,
  TeamOutline,
  CheckSquareOutline,
  LogoutOutline,
  SettingOutline,
  EditOutline,
  PlusCircleFill,
  PlusCircleOutline,
  MessageOutline,
  SendOutline,
  WechatOutline,
  UploadOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule { }
