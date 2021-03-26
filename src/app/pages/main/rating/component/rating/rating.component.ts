import { Component } from "@angular/core";
import { Reviews, ServerResponse } from "@models/index";
import { Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { RatingService } from "../../rating.service";

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss']
})
export class RatingComponent {
  public reviews: Reviews[] = []
  unsubscribe$ = new Subject();
  public total: number;
  public pageIndex = 1;
  public pageSize = 10;
  isVisible: boolean = false;
  activeReview: Reviews;

  constructor(
    public _ratingService: RatingService
  ) {
  }
  ngOnInit(): void {
    this.getReviewList().pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  filter($event) {
    this.pageIndex = 1;
    this.getReviewList($event).pipe(takeUntil(this.unsubscribe$)).subscribe()
  }
  getReviewList(status?: string) {
    const offset = (this.pageIndex - 1) * this.pageSize;
    return this._ratingService.getRatingList(offset, status).pipe(map((data: ServerResponse<Reviews[]>) => {
      this.total = data.count;
      this.reviews = data.results
    }))
  }

  showModal(index: number) {
    this.isVisible = true;
    this.activeReview = this.reviews[index];
    console.log(this.activeReview);
    
 
  }
  public nzPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getReviewList().pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  acceptRating() {
    this._ratingService.acceptRating(this.activeReview.id).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.closeModal()
        return this.getReviewList()
      })
    ).subscribe()
  }
  cancelRating() {
    this._ratingService.cancelRating(this.activeReview.id).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.closeModal()
        return this.getReviewList()
      })
    ).subscribe()
  }

  closeModal() {
    this.isVisible = false;
    this.activeReview = null
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}