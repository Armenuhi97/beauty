import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-create-edit-city',
    templateUrl: 'create-edit-city.component.html',
    styleUrls: ['create-edit-city.component.scss']
})
export class CreateEditCityComponent {
    @Input() isVisible: boolean;
    @Input('value')
    set setValue($event) {
        if ($event)
            this.validateForm.patchValue({
                title_en: $event.title_en,
                title_fr: $event.title_fr,
            })
    }

    @Output() add = new EventEmitter();
    @Output() close = new EventEmitter()
    public validateForm: FormGroup;
    constructor(private _fb: FormBuilder) { }
    ngOnInit() {
        this._initForm()
    }
    private _initForm() {
        this.validateForm = this._fb.group({
            title_en: [null, Validators.required],
            title_fr: [null, Validators.required]
        })
    }
    public closeModal() {
        this.validateForm.reset();
        this.close.emit()
    }
    public onSave() {
        if (this.validateForm.valid) {
            this.add.emit(this.validateForm.value);
            this.validateForm.reset();
        }
    }

    ngOnDestroy() { }
}