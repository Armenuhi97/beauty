import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ELanguges } from '@globals/translation';
import { TranslateService } from '@ngx-translate/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject<void>();
  public languageControl: FormControl = new FormControl(this.languages.RUSSIAN);

  constructor(
    private _translateService: TranslateService,
    private _cookieService: CookieService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._subscribeToLanguageChange();
  }

  private _subscribeToLanguageChange(): void {
    this.languageControl.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((language: typeof ELanguges) => {
        if (language) {
          this._translateService.use(String(language));
        }
      });
  }

  public logout(): void {
    this._cookieService.delete('token');
    this._router.navigate(['']);
  }

  get languages(): typeof ELanguges {
    return ELanguges;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
