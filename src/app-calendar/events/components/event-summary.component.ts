import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as SearchActions from '../actions/event-search-actions';
import * as fromRoot from '../reducers/event-reducers';
import {DecoratedEvent} from '../models/decorated-event';

@Component({
  selector: 'event-summary',
  styleUrls: ['./event-summary.component.scss'],
  templateUrl: './event-summary.component.html',
})
export class EventSummaryComponent implements OnInit {

  @Input() event: any;
  decoratedEvent: DecoratedEvent;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.decoratedEvent = new DecoratedEvent(this.event);
  }

  onClickLocation() {
    this.store.dispatch(new SearchActions.Search({'query': this.event.location}));
  }
}
