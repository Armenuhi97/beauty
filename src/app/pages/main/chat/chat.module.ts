import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from './chat.service';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MemberItemComponent } from './components/member-item/member-item.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { ChatComponent } from './chat.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '@shared/shared.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
@NgModule({
    declarations: [MessageItemComponent, MemberItemComponent, SendMessageComponent, ChatComponent],
    imports: [ChatRoutingModule,CommonModule, InfiniteScrollModule, SharedModule, CommonModule, ReactiveFormsModule, IconsProviderModule],
    providers: [ChatService]
})
export class ChatModule { }
