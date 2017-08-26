import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';
import * as SearchActions from './actions/search-actions';
import * as fromRoot from './reducers/reducers';
import Event = gapi.client.calendar.Event;

@Component({
    selector: 'event-search',
    styleUrls: ['./event-search.component.css'],
    templateUrl: './event-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSearchComponent {
    terms: Observable<string>;
    events: Observable<Event[]>;

    constructor(private store: Store<fromRoot.State>) {
        this.terms = store.select(fromRoot.selectTerms);
        this.events = store.select(fromRoot.selectResults);
    }

    onSearch(terms: string) {
        this.store.dispatch(new SearchActions.Search(terms));
    }
}
