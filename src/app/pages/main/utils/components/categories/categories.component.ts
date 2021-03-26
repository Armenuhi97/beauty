import { Component, OnInit, Input } from '@angular/core';
import { IServicesCategory } from '@models/index';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: IServicesCategory[];

  constructor() { }

  ngOnInit(): void {
  }

}
