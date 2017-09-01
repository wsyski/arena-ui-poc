import {Component, EventEmitter, Input, Output} from '@angular/core';
import Event = gapi.client.calendar.Event;

@Component({
  selector: 'event-summary',
  styleUrls: ['./event-summary.component.scss'],
  templateUrl: './event-summary.component.html',
})
export class EventSummaryComponent {
  @Input() event: any;

  @Output() search = new EventEmitter<string>();

  onClickLocation() {
    this.search.emit(this.event.location);
  }
}
