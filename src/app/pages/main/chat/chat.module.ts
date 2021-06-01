import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";
import { ChatService } from "./chat.service";
import { MemberItemComponent } from "./components/member-item/member-item.component";
import { MessageItemComponent } from "./components/message-item/message-item.component";
import { SendMessageComponent } from "./components/send-message/send-message.component";

@NgModule({
    declarations: [MessageItemComponent, MemberItemComponent, SendMessageComponent, ChatComponent],
    imports: [ChatRoutingModule, InfiniteScrollModule, SharedModule, IconsProviderModule],
    providers: [ChatService]
})
export class ChatModule { }