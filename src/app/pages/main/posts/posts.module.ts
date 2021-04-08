import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { PostCommentComponent, PostsComponent } from "./component";
import { PostsRoutingModule } from "./posts-routing.module";
import { NgImageSliderModule } from 'ng-image-slider';
import { PostService } from "./post.service";

@NgModule({
    declarations: [PostsComponent, PostCommentComponent],
    imports: [PostsRoutingModule, NgImageSliderModule, SharedModule, IconsProviderModule, TranslateModule],
    providers: [PostService]

})
export class PostsModule { }