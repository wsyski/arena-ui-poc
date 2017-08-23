import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'product',
  styleUrls: ['./calendar-event-detail.component.css'],
  templateUrl: './calendar-event-detail.component.html',
})
export class CalendarEventDetailComponent {
  calendarEventId: string;

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(
      params => this.calendarEventId = params['id']
    );
  }
}