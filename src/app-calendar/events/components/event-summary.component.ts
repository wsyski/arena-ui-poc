import {Component, Input} from '@angular/core';
import Event = gapi.client.calendar.Event;

@Component({
  selector: 'event-summary',
  styleUrls: ['./event-summary.component.css'],
  templateUrl: './event-summary.component.html',
})
export class EventSummaryComponent {
  @Input() event: Event;
}
