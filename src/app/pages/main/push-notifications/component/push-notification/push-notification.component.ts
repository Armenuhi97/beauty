import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationModel } from "@models/notification";
import { ServerResponse } from "@models/server-respoce";
import { TranslateService } from "@ngx-translate/core";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetPushNotification } from "@store/push-notification/push-notification.action";
import { selectPushNotification } from "@store/push-notification/push-notification.selectors";
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { PushNotificationService } from "../../push-notification.service";

@Component({
    selector: 'app-push-notification',
    templateUrl: "push-notification.component.html",
    styleUrls: ['push-notification.component.scss'],
    providers:[DatePipe]
})
export class PushNotificationComponent {
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  public pushNotification: NotificationModel[] = [];
  validateForm: FormGroup;
  isVisible: boolean = false;
  quillConfig = {};
  editIndex: number;
  persons = [{ value: 1, label: this.getTranslateWord('MASTERS'), checked: false },
  { value: 2, label: this.getTranslateWord('CLIENTS'), checked: false }]
  constructor(
    private _fb: FormBuilder,
    private _translateService: TranslateService,
    private _pushNotificationService: PushNotificationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this._initConfig();
    this.getNotificationList().pipe(
      takeUntil(this.unsubscribe$)).subscribe()
  }
  public getNotificationList() {
    const offset = (this.pageIndex - 1) * this.pageSize;
    return this._pushNotificationService.getPushNotificationList(offset).pipe(
      map((data: ServerResponse<NotificationModel[]>) => {
        this.total = data.count;

        this.pushNotification = data.results
      })
    )
  }
  public getTranslateWord(key: string) {
    return this._translateService.instant(key)
  }
  editNotification(index: number) {
    this.editIndex = index;
    let item = this.pushNotification[this.editIndex];
    if (item.for_users) {
      if (item.for_users == 1) {
        this.persons.map((el) => { return Object.assign(el, { checked: true }) })
      } else {
        if (item.for_users == 2) {
          this.persons.map((el) => {
            let checked = el.value == 1 ? true : false;
            return Object.assign(el, { checked: checked })
          })
        } else {
          this.persons.map((el) => {
            let checked = el.value == 2 ? true : false;
            return Object.assign(el, { checked: checked })
          })
        }
      }
    }
    this.validateForm.patchValue({
      date: item.execute_date ? new Date(item.execute_date) : null,
      text_en: item.text_en,
      text_fr: item.text_fr,
      person: this.persons,
      title: item.name
    })
    this.showModal()
  }
  nzPageIndexChange($event) {
    this.pageIndex = $event;
    this.getNotificationList().pipe(
      takeUntil(this.unsubscribe$)).subscribe()
  }
  private _initConfig() {
    this.quillConfig = {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], ['link']
        ],
      }
    }
  }
  initForm() {
    this.validateForm = this._fb.group({
      date: [null, Validators.required],
      text_en: [null, Validators.required],
      text_fr: [null, Validators.required],
      person: [null, Validators.required],
      title: [null, Validators.required]
    })
    this.validateForm.get('person').setValue(this.persons)
  }
  showModal() {
    this.isVisible = true
  }
  onSaveNotification() {
    this.validateForm.markAsTouched();
    let selectedPerson = this.validateForm.get('person').value.filter((el) => { return el.checked == true })

    let value = this.validateForm.value
    if (this.validateForm.valid && selectedPerson && selectedPerson.length) {
      let sendObject = {
        text_en: value.text_en,
        text_fr: value.text_fr,
        execute_date: value.date,
        name: value.title,
        for_users: selectedPerson && selectedPerson.length == 2 ? 1 : +selectedPerson[0].value == 1 ? 2 : 3
      }
      if (this.editIndex == null) {
        this._pushNotificationService.addPushNotificationList(sendObject).pipe(
          takeUntil(this.unsubscribe$),
          switchMap(() => {
            return this.getNotificationList()
          })
        ).subscribe(() => {
          this.handleCancel()
        })
      } else {
        this._pushNotificationService.editPushNotificationList(this.pushNotification[this.editIndex].id, sendObject).pipe(
          takeUntil(this.unsubscribe$),
          switchMap(() => {
            return this.getNotificationList()
          })
        ).subscribe(() => {
          this.handleCancel()
        })
      }
      this.handleCancel()
    }
  }
  handleCancel() {
    this.isVisible = false;
    this.validateForm.reset();
    this.editIndex = null;
    this.persons.map((el) => { return Object.assign(el, { checked: false }) })
    this.validateForm.get('person').setValue(this.persons)

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
 }