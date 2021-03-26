import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DEFAULT_NOTIFICATIONS } from "@globals/index";
import { EmailNotification } from "@models/index";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetPushNotification } from "@store/push-notification/push-notification.action";
import { selectPushNotification } from "@store/push-notification/push-notification.selectors";
import { Observable } from "rxjs";

@Component({
    selector: 'app-push-notification',
    templateUrl: "push-notification.component.html",
    styleUrls: ['push-notification.component.scss']
})
export class PushNotificationComponent {
    public pushNotifications$: Observable<EmailNotification[]>;
    validateForm: FormGroup;
    isVisible: boolean = false
    persons = [{ value: 1, label: this.getTranslateWord('MASTERS'), checked: false },
    { value: 2, label: this.getTranslateWord('CLIENTS'), checked: false }]
    constructor(
      private _fb: FormBuilder,
      private _translateService: TranslateService,
      private _store: Store<{ breadcrumbs: BreadCrumbState, pushNotifiations: EmailNotification }>
    ) {
      _store.dispatch(SetPushNotification({ payload: DEFAULT_NOTIFICATIONS }));
      this.pushNotifications$ = _store.select(selectPushNotification);
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