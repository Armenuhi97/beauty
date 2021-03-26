import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { IconsProviderModule } from "src/app/icons-provider.module";
import { PostReviewComponent, ReviewDetailComponent } from "./components";
import { PostReviewRoutingModule } from "./post-reviews-routing.module";

@NgModule({
    declarations: [PostReviewComponent,ReviewDetailComponent],
    imports: [PostReviewRoutingModule, SharedModule, IconsProviderModule, TranslateModule]
})
export class PostReviewsModule { }