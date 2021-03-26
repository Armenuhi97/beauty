import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category } from "@models/category";

@Component({
    selector: 'app-category-card',
    templateUrl: 'category-card.component.html',
    styleUrls: ['category-card.component.scss']
})
export class CategoryCardComponent { 
    @Output() cardClicked = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Input() active: boolean;

    category:Category;
    @Input('category')
    set setCategory($event) {
        this.category = $event
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