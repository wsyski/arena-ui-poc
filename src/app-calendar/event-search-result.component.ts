import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'event-search-result',
    styleUrls: ['./event-search-result.component.css'],
    templateUrl: './event-search-result.component.html'
})
export class EventSearchResultComponent implements OnInit {
  @Input() events;

  constructor() { }

  ngOnInit() {
  }

}
