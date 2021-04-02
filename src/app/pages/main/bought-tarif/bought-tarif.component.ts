import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Category } from "@models/category";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BoughtTarifService } from "./bought-tarif.service";

@Component({
    selector: 'app-bought-tarif',
    templateUrl: 'bought-tarif.component.html',
    styleUrls: ['bought-tarif.component.scss']
})
export class BougthTarifComponent { 
    unsubscribe$ = new Subject();
   public tarifs=[]
    public total: number;
    public pageIndex = 1;
    public pageSize = 10;
    isEditing: boolean = false;
    isVisible: boolean = false;
    validateForm: FormGroup;
    editIndex: number;
    selectItems = [];
    categories: Category[] = [];
   
    constructor(private _boughtTarifService: BoughtTarifService,
        // private _nzMessages: NzMessageService,
        private _fb: FormBuilder) { }

    ngOnInit() {
        this.initSelectItems()
        this.initForm();
      
    } 

    initSelectItems() {
        for (let i = 0; i < 12; i++) {
            this.selectItems.push(i + 1)
        }
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
    editTarif(ind: number) {
        this.showModal()
        this.editIndex = ind;
        let value = this.tarifs[this.editIndex]
        this.validateForm.patchValue({

        })
    }
    public changeStatus(order) {
        // this._boughtTarifService.changetarifStatus(tarif.id).pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public getTarifs() {
        // return this._boughtTarifService.getTarifs(this.categoryControl.value,this.serviceControl.value,this.statusControl.value).pipe(map((data: ServerResponse<any[]>) => {
        //     console.log(data);

        //     this.total = data.count;
        //     this.orders = data.results
        // }))
    }
    initForm() {
        this.validateForm = this._fb.group({
            //
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

    sort(sort, key: string): void {
        if (sort == 'ascend') {
            // this.clientTable.sort((a, b) => { return b[key] - a[key] });
        } else {
            if (sort == 'descend') {
                // this.clientTable.sort((a, b) => { return a[key] - b[key] });
            } else {
                // this.clientTable.sort((a, b) => { return b.id - a.id });
            }
        }
    }

    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        // this.getTarifs().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}