import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';
import * as SearchActions from '../actions/event-search-actions';
import * as fromRoot from '../reducers/event-reducers';
import Event = gapi.client.calendar.Event;

@Component({
    selector: 'event-search',
    styleUrls: ['./event-search.component.scss'],
    templateUrl: './event-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSearchComponent {
    query: Observable<string>;
    events: Observable<Event[]>;

    constructor(private store: Store<fromRoot.State>) {
        this.query = store.select(fromRoot.selectQuery);
        this.events = store.select(fromRoot.selectResults);
    }

    onSearch(query: string) {
        this.store.dispatch(new SearchActions.Search({'query': query}));
    }
}
