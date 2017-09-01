import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers/event-reducers';
import {Observable} from 'rxjs/Observable';
import Event = gapi.client.calendar.Event;

@Component({
    selector: 'event-search-result',
    styleUrls: ['./event-search-result.component.scss'],
    templateUrl: './event-search-result.component.html'
})
export class EventSearchResultComponent{
    selectedEventId$: Observable<string>;
    @Input() events: any;

    constructor(private store: Store<fromRoot.State>, private router: Router) {
        this.selectedEventId$ = store.select(fromRoot.selectedEventId);
    }
}
