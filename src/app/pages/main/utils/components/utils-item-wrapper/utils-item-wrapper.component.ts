import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-utils-item-wrapper',
  templateUrl: './utils-item-wrapper.component.html',
  styleUrls: ['./utils-item-wrapper.component.scss']
})
export class UtilsItemWrapperComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
