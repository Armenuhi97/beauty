import { Component, EventEmitter, Input, Output } from "@angular/core";
import { City, Country } from "@models/country-city";

@Component({
    selector: 'app-city-card',
    templateUrl: 'city-card.component.html',
    styleUrls: ['city-card.component.scss']
})

export class CityCardComponent {
    @Output() cardClicked = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Input() active: boolean;


    @Input() cityCountry: Country | City
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