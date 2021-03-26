import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';

// Translation Module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';

// Reducers
import { BreadCrumbReducer } from '@store/breadcrumb/breadcrumb.reducer';
import { MastersReducer } from '@store/masters/masters.reducer';
import { SideNavReducer } from '@store/side-nav/side-nav.reducer';
import { UtilsReducer } from '@store/utils/utils.reducer';
import { ReviewReducer } from '@store/reviews/reviews.reducer';

// Interceptors
import { ApiInterceptor } from './core/interceptors';

// Environment
import { environment } from 'src/environments/environment';
import { FeedbackReducer } from '@store/feedback/feedback.reducer';
import { EmailNotificationReducer } from '@store/email-notification/email-notification.reducer';
import { PushNotificationReducer } from '@store/push-notification/push-notification.reducer';
import { PostReducer } from '@store/posts/posts.reducer';
import { PostReviewReducer } from '@store/post-review/post-review.reducer';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}

registerLocaleData(ru);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({
      breadCrumbs: BreadCrumbReducer,
      masters: MastersReducer,
      sideNav: SideNavReducer,
      utils:UtilsReducer,
      reviews:ReviewReducer,
      feedbacks:FeedbackReducer,
      emailNotifications:EmailNotificationReducer,
      pushNotifications:PushNotificationReducer,
      posts:PostReducer,
      postReviews:PostReviewReducer

    }),
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: ru_RU
    },
    {
      provide: 'BASE_URL',
      useValue: environment.API_URL,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
