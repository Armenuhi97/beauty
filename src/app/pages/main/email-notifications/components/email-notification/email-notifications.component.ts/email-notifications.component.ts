import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DEFAULT_NOTIFICATIONS } from "@globals/index";
import { EmailNotification } from "@models/index";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetEmailNotification } from "@store/email-notification/email-notification.action";
import { selectEmailNotification } from "@store/email-notification/email-notification.selectors";
import { Observable } from "rxjs";

@Component({
  selector: 'app-email-notifications',
  templateUrl: 'email-notifications.component.html',
  styleUrls: ['email-notifications.component.scss']
})
export class EmailNotificationsComponent {
  public emailNotifications$: Observable<EmailNotification[]>;
  validateForm: FormGroup;
  isVisible: boolean = false
  persons = [{ value: 1, label: this.getTranslateWord('MASTERS'), checked: false },
  { value: 2, label: this.getTranslateWord('CLIENTS'), checked: false }]
  constructor(
    private _fb: FormBuilder,
    private _translateService: TranslateService,
    private _store: Store<{ breadcrumbs: BreadCrumbState, emailNotifiations: EmailNotification }>
  ) {
    _store.dispatch(SetEmailNotification({ payload: DEFAULT_NOTIFICATIONS }));
    this.emailNotifications$ = _store.select(selectEmailNotification);
  }

  ngOnInit(): void {
    this.initForm()
  }
  public getTranslateWord(key: string) {    
    return this._translateService.instant(key)
  }
  initForm() {
    this.validateForm = this._fb.group({
      date: [null],
      text: [null],
      person: [null],
      search: [null]
    })
    this.validateForm.get('person').setValue(this.persons)
  }
  showModal() {
    this.isVisible = true
  }
  onSaveNotification() { }
  handleCancel() {
    this.isVisible = false;
    this.validateForm.reset();
    this.validateForm.get('person').setValue(this.persons)

  }
}