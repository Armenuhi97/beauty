import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EValidationMessages } from '@utilities/index';
import { ELanguges } from '@globals/index';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/core/api-services';
import { ILoginRequest } from '@models/index';
import { finalize, takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  private _unsubscribe: Subject<void> = new Subject<void>();
  public loginForm: FormGroup;
  public loading: boolean;
  public languageControl: FormControl = new FormControl(this.languages.RUSSIAN);
  constructor(
    private _fb: FormBuilder,
    private _translateService: TranslateService,
    private _authService: AuthService,
    private _cookieService: CookieService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._subscribeToLanguageChange();
  }

  private _initForm(): void {
    this.loginForm = this._fb.group({
      username: ['admin1', [Validators.required, Validators.minLength(6)]],
      password: ['Gyumri22+', [Validators.required, Validators.minLength(6)]],
      role_code: 'ADM'
    });
  }

  private _subscribeToLanguageChange(): void {
    this.languageControl.valueChanges.subscribe(
      (language: typeof ELanguges) => {
        if (language) {
          this._translateService.use(String(language));
        }
      }
    );
  }

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const credentials = this.loginForm.value as ILoginRequest;
    this._authService.login(credentials)
      .pipe(
        finalize(() => this.loading = false),
        takeUntil(this._unsubscribe),
      )
      .subscribe((res) => {
        this._cookieService.set('token', res.token);
        this._router.navigate(['/dashboard']);
      });
  }

  get validationMessages(): typeof EValidationMessages {
    return EValidationMessages;
  }

  get languages(): typeof ELanguges {
    return ELanguges;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
