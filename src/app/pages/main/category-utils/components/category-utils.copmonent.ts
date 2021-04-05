import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category, Service } from "@models/category";
import { ServerResponse } from "@models/server-respoce";
import { TranslateService } from "@ngx-translate/core";
import { NzUploadChangeParam } from "ng-zorro-antd/upload";
import { Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { CategoryUtilsService } from "../category-utils.service";
import { getBase64 } from 'src/app/core/utils/baser64';
import { UplopadFileService } from "src/app/core/services/upload-file.service";

@Component({
    selector: 'app-category-utils',
    templateUrl: 'category-utils.copmonent.html',
    styleUrls: ['category-utils.copmonent.scss']
})
export class CategoryUtilsComponent {
    categories: Category[] = [];
    unsubscribe$ = new Subject();
    activeCategory: Category;
    services: Service[];
    validateForm: FormGroup;
    type: string;
    editIndex: number;
    editItem: Service | Category
    isVisible: boolean = false;
    title: string
    constructor(private _categoriesUtilsService: CategoryUtilsService,
        private _translateService: TranslateService,
        private _uploadService: UplopadFileService,
        private _fb: FormBuilder) { }

    ngOnInit() {
        this.initForm()
        this.getCategoryList().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }

    public getCategoryList() {
        return this._categoriesUtilsService.getCategoriesList().pipe(map((data: ServerResponse<Category[]>) => {
            this.categories = data.results
        }))
    }

    openModal() {
        this.isVisible = true;
    }

    initForm() {
        this.validateForm = this._fb.group({
            name_en: [null, Validators.required],
            name_fr: [null, Validators.required],
            is_popular: [false],
            showingImage: [null, Validators.required],
            icon: [null, Validators.required]
        })
    }

    onAddCategory() {
        this.type = 'category';
        this.title = this.getTranslateWord('CATEGORY_UTILS.CATEGORY')
        this.openModal()
    }

    onSave() {
        if (this.validateForm.valid)
            if (this.type == 'category') {
                this.addNewCategory()
            } else {
                this.addNewService()
            }
    }

    getSubCategoriesByCategory(category: Category) {
        this.activeCategory = category;
        this.services = category.services;
    }
    public async handleImageChange(image: NzUploadChangeParam): Promise<void> {
        this.validateForm.get('icon').setValue(image.file.originFileObj);
        // tslint:disable-next-line:no-non-null-assertion
        const base64Image = await getBase64(image.file.originFileObj!);
        this.validateForm.get('showingImage').setValue(base64Image);
    }
    onEditCategory(index: number) {
        this.type = 'category';
        this.title = this.getTranslateWord('CATEGORY_UTILS.CATEGORY')
        // this.editItem = service;
        this.editIndex = index;
        this.validateForm.patchValue({
            name_en: this.categories[index].name_en,
            name_fr: this.categories[index].name_fr,
            showingImage: this.categories[index].icon,
            icon: this.categories[index].icon

        });
        this.openModal()
    }

    deleteCategory(id: number, index: number) {
        this._categoriesUtilsService.deleteCategory(id).pipe(
            takeUntil(this.unsubscribe$),
            switchMap(() => {
                this.activeCategory = null;
                this.services = [];
                return this.getCategoryList();

            })
        ).subscribe()
    }
    public getTranslateWord(key: string) {
        return this._translateService.instant(key)
    }
    onAddService() {
        this.type = 'service';
        this.title = this.getTranslateWord('CATEGORY_UTILS.SERVICE')
        this.openModal()
    }

    onEditService(service: Service, index: number) {
        this.type = 'service';
        this.title = this.getTranslateWord('CATEGORY_UTILS.SERVICE')

        this.editItem = service;
        this.editIndex = index;
        this.validateForm.patchValue({
            name_en: service.name_en,
            name_fr: service.name_fr,
            is_popular: service.is_popular,
            showingImage: service.icon,
            icon: service.icon

        });
        this.openModal()
    }
    closeModal() {
        this.validateForm.reset();
        this.editIndex = null;
        this.isVisible = false;
        this.editItem = null;
        this.type = null
    }
    deleteService(id: number, index: number) {
        this._categoriesUtilsService.deleteService(id).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(() => {
            this.services.splice(index, 1)
        })
    }
    addNewCategory() {
        let sendResponse: Category = {
            icon: this.validateForm.get('icon').value,
            name_en: this.validateForm.get('name_en').value,
            name_fr: this.validateForm.get('name_fr').value,
        };

        if (typeof sendResponse.icon === 'string' || !sendResponse.icon) {
            this._sendSaveOrEditCategoryRequest(sendResponse);
        } else {
            this._uploadService.uploadFile(sendResponse.icon)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((response) => {
                    sendResponse.icon = response;
                    this._sendSaveOrEditCategoryRequest(sendResponse);
                });
        }
    }

    private _sendSaveOrEditCategoryRequest(sendResponse): void {
        if (this.editIndex || this.editIndex == 0) {
            this._categoriesUtilsService.editCategory(this.categories[this.editIndex].id, sendResponse).pipe(takeUntil(this.unsubscribe$),
                switchMap(() => {
                    // this.activeCategory = null;
                    // this.services = [];
                    this.closeModal()
                    return this.getCategoryList()
                })).subscribe()
        } else {
            this._categoriesUtilsService.addCategory(sendResponse).pipe(takeUntil(this.unsubscribe$),
                switchMap(() => {
                    this.activeCategory = null;
                    this.services = [];
                    this.closeModal()
                    return this.getCategoryList()
                })).subscribe()
        }
    }
    addNewService() {
        let sendResponse: Service = {
            icon: this.validateForm.get('icon').value,
            name_en: this.validateForm.get('name_en').value,
            name_fr: this.validateForm.get('name_fr').value,
            category: this.activeCategory.id,
            is_popular: this.validateForm.get('is_popular').value ? true : false
        };

        if (typeof sendResponse.icon === 'string' || !sendResponse.icon) {
            this._sendSaveOrEditServiceRequest(sendResponse);
        } else {
            this._uploadService.uploadFile(sendResponse.icon)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((response) => {
                    sendResponse.icon = response;
                    this._sendSaveOrEditServiceRequest(sendResponse);
                });
        }

    }
    _sendSaveOrEditServiceRequest(sendResponse) {

        if (!this.editItem) {
            this._categoriesUtilsService.addService(sendResponse).pipe(takeUntil(this.unsubscribe$)).subscribe((val: any) => {
                this.categories.map((data) => {
                    if (data.id == this.activeCategory.id) {
                        if (!data['services']) {
                            data['services'] = []
                        }
                        data['services'].push(val)
                    }
                    return data
                })
                this.closeModal()
            })
        } else {
            this._categoriesUtilsService.editService(this.editItem.id, sendResponse).pipe(takeUntil(this.unsubscribe$)).subscribe((result: any) => {
                this.categories.map((data) => {
                    if (data.id == this.activeCategory.id) {
                        data.services.forEach((val, index) => {
                            if (+index == +this.editIndex) {
                                data.services[index] = result
                            }
                        })
                    }
                    return data
                })
                // this.getCategoryList().subscribe()
                this.closeModal()
            })
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}