import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as SearchActions from './actions/search-actions';
import * as fromRoot from './reducers/reducers';
import {Observable} from 'rxjs/Observable';
import Event = gapi.client.calendar.Event;

@Component({
    selector: 'event-search-result',
    styleUrls: ['./event-search-result.component.css'],
    templateUrl: './event-search-result.component.html'
})
export class EventSearchResultComponent implements OnInit {
    selectedEventId$: Observable<string>;
    @Input() events;

    constructor(private store: Store<fromRoot.State>, private router: Router) {
        this.selectedEventId$ = store.select(fromRoot.selectEventId);
    }

    ngOnInit() {
    }

    onSelect(event: Event): void {
        this.store.dispatch(new SearchActions.Select(event.id));
        this.router.navigate(['/detail', event.id]);
    }
}
