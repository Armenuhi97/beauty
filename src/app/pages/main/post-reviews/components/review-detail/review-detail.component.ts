import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-review-detail',
    templateUrl: 'review-detail.component.html',
    styleUrls: ['review-detail.component.scss']
})
export class ReviewDetailComponent {
    validateForm: FormGroup;
    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.initForm()
    }

    initForm() {
        this.validateForm = this._fb.group({
            review: [null]
        })
        this.validateForm.patchValue({
            review: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using  making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,  will uncover many web sites still in their infancy.'
        })
    }
    ngOnDestroy() { }
}