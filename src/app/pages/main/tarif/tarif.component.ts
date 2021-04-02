import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServerResponse } from "@models/server-respoce";
import { Tarif } from "@models/tarif.model";
import { NzUploadChangeParam } from "ng-zorro-antd/upload";
import { Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { TarifService } from "./tarif.service";
// import { NzMessageService } from 'ng-zorro-antd/message';
import { UplopadFileService } from "src/app/core/services/upload-file.service";

@Component({
    selector: 'app-tarif',
    templateUrl: 'tarif.component.html',
    styleUrls: ['tarif.component.scss']
})
export class TarifComponent {
    unsubscribe$ = new Subject();
    tarifs: Tarif[] = []
    public total: number;
    public pageIndex = 1;
    public pageSize = 10;
    isEditing: boolean = false;
    isVisible: boolean = false;
    validateForm: FormGroup;
    editIndex: number;
    selectItems = []
    constructor(private _tarifService: TarifService,
        // private _nzMessages: NzMessageService,
        private _uploadService: UplopadFileService,
        private _fb: FormBuilder) { }

    ngOnInit() {
        this.initSelectItems()
        this.initForm();
        this.getTarifs().pipe(takeUntil(this.unsubscribe$)).subscribe()
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
            category_count: value.category_count,
            description_en: value.description_en,
            description_fr: value.description_fr,
            image: value.image,
            month: value.month,
            price: value.price,
            showingImage: value.image,
            title_en: value.title_en,
            title_fr: value.title_fr
        })
    }
    public changeStatus(tarif: Tarif) {
        this._tarifService.changetarifStatus(tarif.id).pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public getTarifs() {
        return this._tarifService.getTarif().pipe(map((data: ServerResponse<Tarif[]>) => {
            this.total = data.count;
            this.tarifs = data.results
        }))
    }
    initForm() {
        this.validateForm = this._fb.group({
            category_count: [null, Validators.required],
            description_en: [null, Validators.required],
            description_fr: [null, Validators.required],
            image: [null,Validators.required],
            showingImage: [null],
            month: [null, Validators.required],
            price: [null, Validators.required],
            title_en: [null, Validators.required],
            title_fr: [null, Validators.required]
        })
    }
    public async handleImageChange(image: NzUploadChangeParam): Promise<void> {
        this.validateForm.get('image').setValue(image.file.originFileObj);
        // tslint:disable-next-line:no-non-null-assertion
        const base64Image = await this.getBase64(image.file.originFileObj!);
        this.validateForm.get('showingImage').setValue(base64Image);
    }
    public onTarifSave() {
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
        if (typeof formValue.image === 'string' || !formValue.image) {
            this._sendSaveOrRequest(sendingData);
        } else {
            this._uploadService.uploadFile(formValue.image)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((response) => {
                    sendingData.image = response;
                    console.log(sendingData);
                    
                    this._sendSaveOrRequest(sendingData);
                });
        }
    }
    private _sendSaveOrRequest(sendingData): void {
        if (this.isEditing) {
            this._editTraif(sendingData);
        } else {
            this._addTarif(sendingData);
        }
    }
    private _editTraif(sendObject): void {
        this._tarifService
            .editTarif(this.tarifs[this.editIndex].id, sendObject)
            .pipe(takeUntil(this.unsubscribe$),
                switchMap(() => {
                    this.handleCancel();
                    return this.getTarifs()
                }))
            .subscribe(
                () => {
                },
                () => {
                    // this._nzMessages.error('fail');
                }
            );
    }
    private _addTarif(sendingData): void {
        this._tarifService
            .addTarif(sendingData)
            .pipe(takeUntil(this.unsubscribe$),
                switchMap(() => {
                    this.handleCancel();
                    return this.getTarifs()
                }))
            .subscribe(
                () => {
                },
                () => {
                    // this._nzMessages.error('fail');
                }
            );
    }
    getBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    public nzPageIndexChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this.getTarifs().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}