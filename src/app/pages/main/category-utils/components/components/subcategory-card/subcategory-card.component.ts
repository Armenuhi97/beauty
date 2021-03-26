import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Service } from "@models/category";

@Component({
    selector: 'app-subcategory-card',
    templateUrl: 'subcategory-card.component.html',
    styleUrls: ['subcategory-card.component.scss']
})
export class SubcategoryCardComponent {
    @Output() cardClicked = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    service:Service;
    @Input('service')
    set setCategory($event) {
        this.service = $event
    }
    constructor() { }

    ngOnInit(): void {
    }

    onCardClicked(): void {
        this.cardClicked.emit();
    }

    onEdit(): void {
        this.edit.emit();
    }

    onDelete(): void {
        this.delete.emit();
    }
}