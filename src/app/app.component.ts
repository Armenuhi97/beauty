import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './core/services/loaders.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;

  constructor(private _translateService: TranslateService, private loaderService: LoaderService, private renderer: Renderer2) {
    _translateService.addLangs(['ru', 'fr']);
    _translateService.setDefaultLang('ru');
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'cursor-loader');
        this.loading = true;
      } else {
        this.renderer.removeClass(document.body, 'cursor-loader');
        this.loading = false;
      }
    });
  }
}
