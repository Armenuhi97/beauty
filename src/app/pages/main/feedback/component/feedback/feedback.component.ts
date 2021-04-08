import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DEFAULT_Feedback } from "@globals/index";
import { FeedBack, ServerResponse } from "@models/index";
import { Store } from "@ngrx/store";
import { BreadCrumbState } from "@store/breadcrumb/breadcrumb.state";
import { SetFeedback } from "@store/feedback/feedback.action";
import { selectFeedback } from "@store/feedback/feedback.selectors";
import { FeedbackState } from "@store/feedback/feedback.state";
import { Observable, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { FeedbackService } from "../../feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.scss'],
  providers:[DatePipe]
})
export class FeedbackComponent {
  public feedbacks = []
  isVisible: boolean = false;
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  rolesList = [{code:'CL',label:'NAVIGATION.USERS'}, {code:'MST',label:'NAVIGATION.MASTERS'}];
  answeredList = [{label:'FEEDBACK.ANSWERED',type:1}, {label:'FEEDBACK.UNANSWERED',type:0}]
  public roleControl = new FormControl('');
  public answeredControl = new FormControl('');
  activeFeedback;
  constructor(
    private _feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {
    this.getFeedbackList().pipe(takeUntil(this.unsubscribe$)).subscribe();
    this.subsribeAswer();
    this.subsribeRole()
  }

  subsribeRole() {
    this.roleControl.valueChanges.pipe(takeUntil(this.unsubscribe$), switchMap((value) => {      
      return this.getFeedbackList()
    })).subscribe()
  }
  subsribeAswer() {
    this.answeredControl.valueChanges.pipe(takeUntil(this.unsubscribe$), switchMap((value) => {
      return this.getFeedbackList()
    })).subscribe()
  }
  editFeedback(feedback,index:number){
    this.activeFeedback=feedback;
    this.openModal()
  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getFeedbackList().pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  public getFeedbackList() {
    const offset = (this.pageIndex - 1) * this.pageSize;

    return this._feedbackService.getFeedBacks(offset, this.answeredControl.value, this.roleControl.value).pipe(
      map((data: ServerResponse<any>) => {
        console.log(data.results);
        
        this.total = data.count;
        this.feedbacks = data.results
      })
    )
  }
  openModal() {
    this.isVisible = true;
  }
  closeModal() {
    this.activeFeedback=null
    // this.validateForm.reset();
    // this.editIndex = null;
    this.isVisible = false;
    // this.editItem = null;
    // this.type = null
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}