import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'category-utils',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then(
            (m) => m.UsersModule
          )
      },
      {
        path: 'masters',
        loadChildren: () =>
          import('./master/master.module').then(
            (m) => m.MasterModule
          ),
      },
      {
        path: 'utils',
        loadChildren: () =>
          import('./utils/utils.module').then(
            (m) => m.UtilsModule
          ),
      },

      {
        path: 'reviews',
        loadChildren: () =>
          import('./rating/rating.module').then(
            (m) => m.RatingModule
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      {
        path: 'email-notifications',
        loadChildren: () =>
          import('./email-notifications/email-notifications.module').then(
            (m) => m.EmailNtificationsModule
          ),
      },
      {
        path: 'push-notifications',
        loadChildren: () =>
          import('./push-notifications/push-notifications.module').then(
            (m) => m.PushNotificationModule
          ),
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('./posts/posts.module').then(
            (m) => m.PostsModule
          ),
      },
      {
        path: 'post-review',
        loadChildren: () =>
          import('./post-reviews/post-reviews.module').then(
            (m) => m.PostReviewsModule
          ),
      },
      {
        path: 'category-utils',
        loadChildren: () =>
          import('./category-utils/category-utils.module').then(
            (m) => m.CategoryUtilsModule
          ),
      },
      {
        path: 'tarif',
        loadChildren: () =>
          import('./tarif/tarif.module').then(
            (m) => m.TarifModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
