import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as DetailActions from '../actions/event-detail-actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import * as SearchActions from '../actions/event-search-actions';
import {DecoratedEvent} from '../models/decorated-event';
import {Observable} from 'rxjs/Observable';
import Event = gapi.client.calendar.Event;

@Component({
  selector: 'event-detail',
  styleUrls: ['./event-detail.component.scss'],
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent {
  decoratedEvent$: Observable<DecoratedEvent>;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) {

    this.decoratedEvent$ = this.store.select(fromRoot.selectedEvent).map((event: Event) => (event) ? new DecoratedEvent(event) : null);
    this.route.params.subscribe(
      params => {
        this.store.dispatch(new DetailActions.Select(params['id']));
      }
    );
  }

  onClickLocation(): void {
    let subscription = this.decoratedEvent$.subscribe((decoratedEvent: DecoratedEvent) => {
      if (decoratedEvent) {
        this.store.dispatch(new SearchActions.Search({'query': decoratedEvent.location}));
      }
      subscription.unsubscribe();
    });
  }
}
