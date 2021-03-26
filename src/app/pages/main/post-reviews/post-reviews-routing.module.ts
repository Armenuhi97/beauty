import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostReviewComponent } from "./components";
import { ReviewDetailComponent } from "./components/review-detail/review-detail.component";
const routes: Routes = [
    { path: '', component: PostReviewComponent },
    { path: ':id', component: ReviewDetailComponent }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostReviewRoutingModule { }