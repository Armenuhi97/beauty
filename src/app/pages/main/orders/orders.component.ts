import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Category, Service } from "@models/category";
import { ServerResponse } from "@models/server-respoce";
import { forkJoin, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { OrdersService } from "./orders.service";

@Component({
    selector: 'app-orders',
    templateUrl: 'orders.component.html',
    styleUrls: ['orders.component.scss']
})
export class OrdersComponent {
    unsubscribe$ = new Subject();
    orders: any[] = [{
        category:1,
        service:1,
        price:'150.00',
        duration:1,
        popular:false
    }]
    public total: number;
    public pageIndex = 1;
    public pageSize = 10;
    isEditing: boolean = false;
    isVisible: boolean = false;
    validateForm: FormGroup;
    editIndex: number;
    selectItems = [];
    categories: Category[] = [];
    services: Service[];
    categoryControl = new FormControl('');
    serviceControl = new FormControl('');
    constructor(private _orderService: OrdersService,
        // private _nzMessages: NzMessageService,
        private _fb: FormBuilder) { }

    ngOnInit() {
        this.initSelectItems()
        this.initForm();
        this.subscribeToCategoryChange();
        this.subscribeToServiceChange()
        this.combineObservable()
        // this.getOrders().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    combineObservable() {
        const combine = forkJoin(
            this.getCategories()
        )
        combine.pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public getCategories() {
        return this._orderService.getCategoriesList().pipe(
            map((data: ServerResponse<Category[]>) => {
                this.categories = data.results
            })
        )
    }
    initSelectItems() {
        for (let i = 0; i < 12; i++) {
            this.selectItems.push(i + 1)
        }
    }
    subscribeToCategoryChange(): void {
        this.categoryControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((data:Category) => {
            console.log(data);
            this.serviceControl.setValue('')
            if (data) {
                this.services = data.services;
                //request this.getOrders().pipe(takeUntil(this.unsubscribe$)).subscribe()
            } else {
                this.services = []
                //request this.getOrders().pipe(takeUntil(this.unsubscribe$)).subscribe()
            }

        });
    }
    subscribeToServiceChange(): void {
        this.serviceControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
            // if (data)
                // this.getOrders().pipe(takeUntil(this.unsubscribe$)).subscribe()

        });
    }
    public showModal(): void {
        this.isVisible = true;
    }
    handleCancel(): void {
        this.isVisible = false;
        this.isEditing = false;
        this.validateForm.reset();
        this.editIndex = null
    }
    editOrder(ind: number) {
        this.showModal()
        this.editIndex = ind;
        let value = this.orders[this.editIndex]
        this.validateForm.patchValue({

        })
    }
    public changeStatus(order) {
        // this._orderService.changetarifStatus(tarif.id).pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public getOrders() {
        return this._orderService.getOrders().pipe(map((data: ServerResponse<any[]>) => {
            console.log(data);

            this.total = data.count;
            this.orders = data.results
        }))
    }
    initForm() {
        this.validateForm = this._fb.group({
            duration:[null,Validators.required],
            price:[null,Validators.required],
            popular:[false]
        })
    }

    public onOrderSave() {
        if (this.validateForm.invalid) {
            for (const i in this.validateForm.controls) {
                this.validateForm.controls[i].markAsDirty();
                this.validateForm.controls[i].updateValueAndValidity();
            }
            // this._nzMessages.error('Validate error');
            return;
        }
        const formValue = this.validateForm.value;
        const sendingData = {
            "title_en": formValue.title_en,
            "title_fr": formValue.title_fr,
            "description_en": formValue.description_en,
            "description_fr": formValue.description_fr,
            "image": formValue.image,
            "month": formValue.month,
            "price": formValue.price,
            "category_count": formValue.category_count,
        };

    }



    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this.getOrders().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}