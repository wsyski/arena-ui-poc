import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as DetailActions from '../actions/event-detail-actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import * as SearchActions from '../actions/event-search-actions';
import {DecoratedEvent} from '../models/decorated-event';
import {Subscription} from 'rxjs/Subscription';
import Event = gapi.client.calendar.Event;

@Component({
  selector: 'event-detail',
  styleUrls: ['./event-detail.component.scss'],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit, OnDestroy {
  decoratedEvent: DecoratedEvent;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) {

    this.route.params.subscribe(
      params => {
        this.store.dispatch(new DetailActions.Select(params['id']));
      }
    );

  }

  ngOnInit() {
    this.subscription = this.store.select(fromRoot.selectedEvent).subscribe((event: Event) => this.decoratedEvent = new DecoratedEvent(event));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onClickLocation() {
    this.store.dispatch(new SearchActions.Search({'query': this.decoratedEvent.location}));
  }
}
