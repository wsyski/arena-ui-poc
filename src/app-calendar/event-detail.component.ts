import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'product',
  styleUrls: ['./event-detail.component.css'],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent {
  calendarEventId: string;

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(
      params => this.calendarEventId = params['id']
    );
  }
}